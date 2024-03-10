import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
