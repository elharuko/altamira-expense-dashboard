import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";  
import { supabase } from "../../lib/supabase";
  
export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const error = params.get("error");

      // 1. Si hay error → volver a login con mensaje
      if (error) {
        navigate("/signin", {
          replace: true,
          state: {
            oauthError: "ACCOUNT_NOT_ALLOWED",
          },
        });
        return;
      }

      // 2. Esperar sesión real de Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // fallback de seguridad
        navigate("/signin", { replace: true });
        return;
      }

      // 3. Sesión OK → dashboard
      navigate("/dashboard", { replace: true });
    };

    handleCallback();
  }, []);

  return null;
}
