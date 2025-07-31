import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to verify webhook signature
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Remove 'sha256=' prefix if present
  const cleanSignature = signature.startsWith('sha256=') ? signature.slice(7) : signature;
  
  return expectedSignature === cleanSignature;
}

// Product ID mapping
const PRODUCT_PLANS = {
  595887: 'lifetime',  // PRODUCT_LIFETIME_ID
  595901: 'studio',    // PRODUCT_STUDIO_ID  
  595903: 'monthly'    // PRODUCT_MONTHLY_ID
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

    // Get the raw body and signature for verification
    const rawBody = await req.text();
    const signature = req.headers.get('X-Signature');
    const webhookSecret = Deno.env.get('LEMONSQUEEZY_WEBHOOK_SECRET');

    console.log('LemonSqueezy webhook received, signature present:', !!signature);

    // Verify signature if secret is configured
    if (webhookSecret) {
      if (!signature) {
        console.error('Missing X-Signature header');
        return new Response('Missing signature', { 
          status: 401, 
          headers: corsHeaders 
        });
      }

      const isValid = await verifySignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.error('Invalid webhook signature');
        return new Response('Invalid signature', { 
          status: 401, 
          headers: corsHeaders 
        });
      }

      console.log('Webhook signature verified successfully');
    } else {
      console.warn('No webhook secret configured - signature verification skipped');
    }

    const payload = JSON.parse(rawBody);
    console.log('LemonSqueezy webhook payload:', JSON.stringify(payload, null, 2));

    // Verify this is a successful order event
    if (payload.meta?.event_name === 'order_created' && payload.data?.attributes?.status === 'paid') {
      const orderData = payload.data.attributes;
      const productId = parseInt(orderData.product_id);
      const customData = orderData.checkout_data?.custom || {};
      const userId = customData.uid;

      console.log('Processing successful payment:', {
        productId,
        userId,
        customerEmail: orderData.user_email
      });

      // Validate required data
      if (!userId) {
        console.error('No custom uid found in webhook payload');
        return new Response('No user ID found in custom data', { 
          status: 400, 
          headers: corsHeaders 
        });
      }

      // Get plan from product ID
      const plan = PRODUCT_PLANS[productId];
      if (!plan) {
        console.error('Unknown product ID:', productId);
        return new Response('Unknown product ID', { 
          status: 400, 
          headers: corsHeaders 
        });
      }

      // Update user profile directly using the custom uid
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          status: 'active',
          plan: plan,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return new Response('Error updating profile', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      console.log('Successfully activated user:', userId, 'with plan:', plan);
      
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