import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface UiState {
  user_type: string;
  [key: string]: unknown;
}

interface MimallClient {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  html_content: string;
  session_id: string;
  ui_state: UiState;
  created_at: string;
  updated_at: string;
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Get session data
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Error fetching session:', sessionError.message)
      return NextResponse.json({ 
        session_id: 'default_session_id',
        email: null,
        error: sessionError.message 
      }, { status: 200 })
    }

    if (!session) {
      return NextResponse.json({ 
        session_id: 'default_session_id',
        email: null,
        user_profile: null
      }, { status: 200 })
    }

    // Fetch user profile from mimall_client table
    const { data: userProfile, error: profileError } = await supabase
      .from('mimall_client')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (profileError) {
      console.error('Error fetching user profile:', profileError.message)
    }

    // Return user information
    return NextResponse.json({
      session_id: session.user.id,
      email: session.user.email,
      auth: {
        id: session.user.id,
        email: session.user.email,
        phone: session.user.phone,
        created_at: session.user.created_at,
        updated_at: session.user.updated_at,
        last_sign_in_at: session.user.last_sign_in_at,
      },
      user_profile: userProfile as MimallClient | null
    }, { status: 200 })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ 
      session_id: 'default_session_id',
      email: null,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
