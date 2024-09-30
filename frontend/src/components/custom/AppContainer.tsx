import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen">
      <UserMenu user={user} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};
export default AppContainer;
