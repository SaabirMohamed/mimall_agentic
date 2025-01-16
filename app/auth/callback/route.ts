import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const userType = requestUrl.searchParams.get('type') || 'shopper'
    
    // Determine the base URL based on environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://mimall.ageye.pro' 
        : 'http://localhost:8084')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      // Exchange code for session
      const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (authError) throw authError

      if (session?.user) {
        // Check if user exists in mimall_client
        const { data: existingProfile } = await supabase
          .from('mimall_client')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!existingProfile) {
          // Create new profile if it doesn't exist
          const { error: profileError } = await supabase
            .from('mimall_client')
            .insert({
              user_id: session.user.id,
              email: session.user.email,
              first_name: '',
              last_name: '',
              avatar_url: session.user.user_metadata?.avatar_url || '',
              session_id: session.access_token,
              ui_state: { user_type: userType }
            })

          if (profileError) throw profileError
        } else {
          // Update session_id for existing profile
          const { error: updateError } = await supabase
            .from('mimall_client')
            .update({
              session_id: session.access_token,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', session.user.id)

          if (updateError) throw updateError
        }
      }
    }

    // Redirect to dashboard after successful auth and profile creation/update
    return NextResponse.redirect(`${baseUrl}/dashboard`)
  } catch (error) {
    console.error('Auth callback error:', error)
    // Redirect to login page with error
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://mimall.ageye.pro' 
        : 'http://localhost:8084')
    return NextResponse.redirect(`${baseUrl}/login?error=auth_callback_failed`)
  }
}