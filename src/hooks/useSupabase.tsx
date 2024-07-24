import { createClient } from "@supabase/supabase-js";
import { useAppSelector } from "../redux/hooks";

const useSupabase = () => {
  const token = useAppSelector((state) => state.auth.token);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return supabase;
};

export default useSupabase;
