import { useState } from "react";
import UClogout from "../useCases/logout";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    await UClogout();
    setLoading(false);
  };
  return { loading, logout };
};

export default useLogout;
