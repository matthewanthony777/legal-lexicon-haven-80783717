// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ddlmlpqtgctstdbpftsi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbG1scHF0Z2N0c3RkYnBmdHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjIzNDYsImV4cCI6MjA1MjU5ODM0Nn0.c3fhFG8_PQj6j2tSoGKZsejY3OGh8hL7S9aQsH1D-rw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);