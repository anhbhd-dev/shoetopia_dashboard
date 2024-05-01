import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { CircularProgress } from "@chakra-ui/react";

export const ProtectedRoute = () => {
  const { isAuthenticating } = useAuthContext();

  if (isAuthenticating)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress
          className="mb-40"
          isIndeterminate
          size="60px"
          color="teal.500"
        />
      </div>
    );
  return <Outlet />;
};

export default ProtectedRoute;
