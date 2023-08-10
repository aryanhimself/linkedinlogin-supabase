import { useEffect } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

function App() {
  const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY", {
    auth: { autoRefreshToken: true, persistSession: true },
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      console.log(session);
    });
  }, [supabase.auth]);

  const loginWIthLinkedin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin",
    });
    if (error) {
      console.log(error);
      return;
    }
    const d = await supabase.auth.getSession();
    console.log(d);
  };

  return <button onClick={loginWIthLinkedin}>Login WIth linkedin</button>;
}

export default App;
