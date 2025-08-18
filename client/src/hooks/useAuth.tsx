import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
// import { toast } from "sonner";



export const useAuth = () => {
  const { user, setUser } = useUserStore();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(token ? true : false);

  useEffect(() => {
    if (!user && loading) {
      const fetchInfo = async () => {
        try {
          const res = await fetch(`${url}/user/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          if (data.success) {
            setUser(data.data);
          } else {
            throw new Error(data.error || "something went wrong!");
          }
        } catch (error: any) {
          localStorage.removeItem("token");
          localStorage.removeItem("refToken");
        } finally {
          setLoading(false);
        }
      };

      fetchInfo();
    }
  }, []);

  return { user, loading };
};