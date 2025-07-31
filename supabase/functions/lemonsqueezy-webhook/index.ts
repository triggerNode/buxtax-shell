import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload = await req.json();
    console.log('LemonSqueezy webhook received:', JSON.stringify(payload, null, 2));

    // Verify this is a successful order event
    if (payload.meta?.event_name === 'order_created' && payload.data?.attributes?.status === 'paid') {
      const orderData = payload.data.attributes;
      const customerEmail = orderData.user_email;

      console.log('Processing successful payment for email:', customerEmail);

      if (!customerEmail) {
        console.error('No customer email found in webhook payload');
        return new Response('No customer email found', { 
          status: 400, 
          headers: corsHeaders 
        });
      }

      // Find user by email in auth.users and update their profile
      const { data: users, error: userError } = await supabase.auth.admin.listUsers();
      
      if (userError) {
        console.error('Error fetching users:', userError);
        return new Response('Error fetching users', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      const user = users.users.find(u => u.email === customerEmail);
      
      if (!user) {
        console.error('User not found for email:', customerEmail);
        return new Response('User not found', { 
          status: 404, 
          headers: corsHeaders 
        });
      }

      // Update user profile to active status
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          status: 'active',
          plan: 'lifetime',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return new Response('Error updating profile', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      console.log('Successfully activated user:', user.id, 'for email:', customerEmail);
      
      return new Response('Profile activated successfully', { 
        status: 200, 
        headers: corsHeaders 
      });
    }

    // For other webhook events, just acknowledge receipt
    console.log('Webhook received but not processed (not a successful order)');
    return new Response('Webhook received', { 
      status: 200, 
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});