
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uveqzdpfaqrnketuutgf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZXF6ZHBmYXFybmtldHV1dGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMjg2MzcsImV4cCI6MjA1NjgwNDYzN30.MzrW0id3l6Kk0eOiDnA8AjE_Zp_8UwWI9NYqPJIjcHE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
