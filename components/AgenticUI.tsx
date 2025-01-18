import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useConversation } from '@11labs/react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface UIState {
  html: string | null;
  session_id: string;
}

interface AgenticUIProps {
  children: React.ReactNode;
}

export default function AgenticUI({ children }: AgenticUIProps) {
  const [uiState, setUiState] = useState<UIState | null>(null);
  const conversation = useConversation({
    onConnect: () => console.log('Connected to ElevenLabs'),
    onDisconnect: () => console.log('Disconnected from ElevenLabs'),
    onError: (error) => console.error('ElevenLabs error:', error),
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize ElevenLabs conversation
    const initElevenLabs = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const conversationId = await conversation.startSession({
          agentId: '4qre9tSCt0aTdREuY9we',
          clientTools: {
            discover_session_id: async () => {
              return uiState?.session_id || 'default_session_id';
            }
          }
        });
        setIsConnected(true);
        console.log('ElevenLabs session started:', conversationId);
      } catch (error) {
        console.error('Failed to initialize ElevenLabs:', error);
      }
    };

    initElevenLabs();

    // Subscribe to ui_state changes
    const channel = supabase
      .channel('ui_state_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ui_state'
        },
        (payload) => {
          console.log('UI state changed:', payload);
          setUiState(payload.new as UIState);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
      conversation.endSession();
    };
  }, []);

  // Render the ElevenLabs status indicator
  const StatusIndicator = () => (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: isConnected ? '#4CAF50' : '#FF5252',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        zIndex: 1000
      }}
      onClick={() => conversation.isSpeaking && conversation.setVolume({ volume: 0.5 })}
    >
      <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '3px solid white',
          animation: conversation.isSpeaking ? 'pulse 1.5s infinite' : 'none'
        }}
      />
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
