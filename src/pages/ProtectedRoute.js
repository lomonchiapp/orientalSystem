import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../@core/context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router])

if (loading || !user) {
  return <div>Loading...</div>
}

return children
}

export default ProtectedRoute;

