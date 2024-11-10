import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hihgklscsoxalrnxrwjf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpaGdrbHNjc294YWxybnhyd2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5Mjg5NDgsImV4cCI6MjA0NDUwNDk0OH0.xCY4Z-jx1ntY93AssKRjwtxiNSVh2JyDHdPcUO5jEgU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
