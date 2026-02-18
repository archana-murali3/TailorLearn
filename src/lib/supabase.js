import { createClient } from '@supabase/supabase-js';

/** @typedef {import('./database.types.js').Database} Database */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/** @type {import('@supabase/supabase-js').SupabaseClient<Database>} */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
