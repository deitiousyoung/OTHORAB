const SUPABASE_URL = 'https://hfjcdkmpyldlvxweknci.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmamNka21weWxkbHZ4d2VrbmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTEwMTYsImV4cCI6MjA5MTQ4NzAxNn0.NpdwMuolCMME_hGYLMcav1POow6YmurLmn9Bt7_wN4M';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
