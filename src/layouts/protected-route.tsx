// ProtectedRoute.js
import { CircularProgress } from "@chakra-ui/react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = () => {
  const { isAuthenticating } = useAuthContext();
  const outlet = useMemo(
    () =>
      isAuthenticating ? (
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress
            className="mb-40"
            isIndeterminate
            size="60px"
            color="teal.500"
          />
        </div>
      ) : (
        <Outlet />
      ),
    [isAuthenticating]
  );

  return outlet;
};

export default ProtectedRoute;
