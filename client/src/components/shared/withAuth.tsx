import { useAuth } from "@/hooks/useAuth";
import { RefreshCw } from "lucide-react";
import { useEffect, type ElementType } from "react";
import { useNavigate } from "react-router-dom";

const withAuth =
  (WrappedComponent: ElementType, isAuth = true) =>
  (props: any) => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!user && !loading && isAuth) {
        navigate("/signin");
      }

      if (user && !isAuth) {
        navigate("/");
      }
    }, [loading]);

    // ........................................ approach 1 -> seperate logic based on auth status // .......................
    // Protected page -> Dashboard and orders
    if (isAuth) {
      if (loading) return <Loading />;
      if (user) return <WrappedComponent {...props} />;
      return null; // redirect happening
    }

    // Public page -> Signin and signup
    if (!isAuth) {
      // If user logged in and not loading → redirect will handle
      // If not logged in → show page immediately
      if (!loading && !user) return <WrappedComponent {...props} />; // optional if you want to block during login check
      return <Loading />;
    }

    return null;

    // ........................................ approach 2 -> combine logic based on auth status // ........................
    // return user && isAuth ? (
    //   <WrappedComponent {...props} /> // dashboard, order pages
    // ) : !user && !isAuth && !loading ? (
    //   <WrappedComponent {...props} /> // signin and signup pages
    // ) : (
    //   <Loading />
    // );
  };

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)]">
      <h1 className="text-3xl login-font flex items-center gap-5">
        <RefreshCw className="animate-spin mt-1" /> Please wait...
      </h1>
    </div>
  );
};

export default withAuth;