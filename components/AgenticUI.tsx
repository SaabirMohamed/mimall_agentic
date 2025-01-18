import { useEffect, useState } from 'react';
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
  user_id?: string;
}

interface AgenticUIProps {
  children: React.ReactNode;
}

export default function AgenticUI({ children }: AgenticUIProps) {
  const [uiState, setUiState] = useState<UIState | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const { data: session } = useSession();
  
  const conversation = useConversation({
    onConnect: () => console.log('Connected to ElevenLabs'),
    onDisconnect: () => console.log('Disconnected from ElevenLabs'),
    onError: (error) => console.error('ElevenLabs error:', error),
    onMessage: (message) => {
      console.log('ElevenLabs message:', message);
    }
  });

  useEffect(() => {
    if (session?.user?.email) {
      // Generate a consistent session ID for logged-in users
      const userSessionId = `session_${session.user.email.split('@')[0]}_${Date.now()}`;
      setSessionId(userSessionId);
    } else {
      // Generate anonymous session ID
      setSessionId(`anon_${Date.now()}`);
    }
  }, [session]);

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

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  const toggleConversation = async () => {
    if (!isActive) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const conversationId = await conversation.startSession({
          agentId: '4qre9tSCt0aTdREuY9we',
          clientTools: {
            discover_session_id: async () => {
              return sessionId;
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
