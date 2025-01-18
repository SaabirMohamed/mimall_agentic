'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useConversation } from '@11labs/react';
import { useSession } from 'next-auth/react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface UIState {
  html: string | null;
  session_id: string;
  user_id?: string | null;
  current_route?: string;
}

interface AgenticUIProps {
  children: React.ReactNode;
}

export default function AgenticUI({ children }: AgenticUIProps) {
  const [uiState, setUiState] = useState<UIState | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const { data: session, status } = useSession();
  
  const conversation = useConversation({
    onConnect: () => console.log('Connected to ElevenLabs'),
    onDisconnect: () => console.log('Disconnected from ElevenLabs'),
    onError: (error) => console.error('ElevenLabs error:', error),
    onMessage: (message) => {
      console.log('ElevenLabs message:', message);
    }
  });

  // Initialize or get session
  const initializeSession = useCallback(async (newSessionId: string) => {
    if (!newSessionId) return false;
    
    try {
      // First, check if session exists
      const { data: existingSession } = await supabase
        .from('ui_state')
        .select('*')
        .eq('session_id', newSessionId)
        .single();

      if (!existingSession) {
        // Create new session if it doesn't exist
        const { data: newSession, error } = await supabase
          .from('ui_state')
          .insert([
            {
              session_id: newSessionId,
              user_id: session?.user?.email || null,
              html: '<div class="p-4 text-center text-white">Session initialized. Click the circle to begin.</div>',
              current_route: typeof window !== 'undefined' ? window.location.pathname : '/'
            }
          ])
          .select()
          .single();

        if (error) throw error;
        console.log('Created new session:', newSession);
        setUiState(newSession);
      } else {
        console.log('Found existing session:', existingSession);
        setUiState(existingSession);
      }

      return true;
    } catch (error) {
      console.error('Error initializing session:', error);
      return false;
    }
  }, [session]);

  useEffect(() => {
    // Wait for session to be checked
    if (status === 'loading') return;

    const initSession = async () => {
      let newSessionId: string;
      if (session?.user?.email) {
        // Generate a consistent session ID for logged-in users
        newSessionId = `session_${session.user.email.split('@')[0]}_${Date.now()}`;
      } else {
        // Generate anonymous session ID
        newSessionId = `anon_${Date.now()}`;
      }
      setSessionId(newSessionId);
      await initializeSession(newSessionId);
    };

    initSession();
  }, [session, status, initializeSession]);

  useEffect(() => {
    // Only subscribe to Supabase when we have a session ID
    if (!sessionId) return;

    // Subscribe to ui_state changes for this session
    const channel = supabase
      .channel('ui_state_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ui_state',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          console.log('UI state changed:', payload);
          setUiState(payload.new as UIState);
        }
      )
      .subscribe();

    // Update current route when it changes
    const updateRoute = async () => {
      if (uiState) {
        await supabase
          .from('ui_state')
          .update({ current_route: window.location.pathname })
          .eq('session_id', sessionId);
      }
    };

    // Listen for route changes
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', updateRoute);
    }

    return () => {
      channel.unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', updateRoute);
      }
    };
  }, [sessionId, uiState]);

  const toggleConversation = async () => {
    if (!isActive) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const conversationId = await conversation.startSession({
          agentId: '4qre9tSCt0aTdREuY9we',
          clientTools: {
            discover_session_id: async () => {
              // Ensure session exists before returning ID
              const sessionExists = await initializeSession(sessionId);
              return sessionExists ? sessionId : '';
            }
          }
        });
        setIsActive(true);
        console.log('ElevenLabs session started:', conversationId);
      } catch (error) {
        console.error('Failed to initialize ElevenLabs:', error);
      }
    } else {
      await conversation.endSession();
      setIsActive(false);
    }
  };

  // Render the ElevenLabs status indicator
  const StatusIndicator = () => (
    <div className="fixed bottom-20 right-20 flex flex-col items-center">
      {/* Session ID Display */}
      <div className="mb-2 text-sm text-white font-mono"
        style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          opacity: isActive ? 1 : 0.7
        }}>
        {sessionId}
      </div>
      
      {/* Status Circle */}
      <div
        onClick={toggleConversation}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: isActive ? '#4CAF50' : '#FF5252',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          transform: isActive && conversation.isSpeaking ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '3px solid white',
            animation: isActive && conversation.isSpeaking ? 'pulse 1.5s infinite' : 'none'
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      {uiState?.html ? (
        <div 
          dangerouslySetInnerHTML={{ __html: uiState.html }} 
          style={{ width: '100%', minHeight: '100vh' }}
        />
      ) : (
        children
      )}
      <StatusIndicator />
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
