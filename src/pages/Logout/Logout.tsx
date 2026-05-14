import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { logoutUser } from "api/auth/authApi";

export default function Logout(): null {
  const history = useHistory();
  const queryClient = useQueryClient();

  useEffect(() => {
    logoutUser();
    queryClient.clear();
    history.push("/");
  }, [history, queryClient]);

  return null;
}
