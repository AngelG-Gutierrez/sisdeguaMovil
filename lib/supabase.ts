import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eokkdouvyvovyhdljeix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVva2tkb3V2eXZvdnloZGxqZWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzkzMTUsImV4cCI6MjA3NjU1NTMxNX0.Nr6zt2_zAkr-JRrxurNHvVOHVmzDV4UInKUn-EjgB2s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})