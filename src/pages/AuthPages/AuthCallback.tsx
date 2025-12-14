import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const error = params.get("error");
    const description = params.get("error_description");

    if (error) {
      navigate("/signin", {
        replace: true,
        state: {
          oauthError: "ACCOUNT_NOT_ALLOWED",
        },
      });
      return;
    }

    navigate("/dashboard", { replace: true });
  }, []);

  return null;
}
