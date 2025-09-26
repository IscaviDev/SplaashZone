import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-184c0171/health", (c) => {
  return c.json({ status: "ok" });
});

// Register user endpoint
app.post("/make-server-184c0171/auth/register", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log(`Registration error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ user: data.user, message: "User registered successfully" });
  } catch (error) {
    console.log(`Registration error: ${error}`);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// Create payment intent endpoint
app.post("/make-server-184c0171/create-payment-intent", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (accessToken && accessToken !== Deno.env.get('SUPABASE_ANON_KEY')) {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (error || !user) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
    }
    
    const { amount, currency = 'eur' } = await c.req.json();
    
    const stripe = (await import('npm:stripe')).default(Deno.env.get('STRIPE_SECRET_KEY')!);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return c.json({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (error) {
    console.log(`Payment intent creation error: ${error}`);
    return c.json({ error: 'Failed to create payment intent' }, 500);
  }
});

// Save order endpoint
app.post("/make-server-184c0171/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    let userId = null;
    
    if (accessToken && accessToken !== Deno.env.get('SUPABASE_ANON_KEY')) {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (!error && user) {
        userId = user.id;
      }
    }
    
    const orderData = await c.req.json();
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      id: orderId,
      userId,
      ...orderData,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${orderId}`, order);
    
    return c.json({ orderId, message: "Order saved successfully" });
    
  } catch (error) {
    console.log(`Order save error: ${error}`);
    return c.json({ error: 'Failed to save order' }, 500);
  }
});

// Get user orders endpoint
app.get("/make-server-184c0171/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const orders = await kv.getByPrefix('order:');
    const userOrders = orders.filter(order => order.userId === user.id);
    
    return c.json({ orders: userOrders });
    
  } catch (error) {
    console.log(`Get orders error: ${error}`);
    return c.json({ error: 'Failed to get orders' }, 500);
  }
});

Deno.serve(app.fetch);