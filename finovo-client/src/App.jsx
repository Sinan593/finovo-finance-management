import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
