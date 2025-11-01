import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import JobDetail from "./pages/JobDetail";
import Shortlist from "./pages/Shortlist";
import Apply from "./pages/Apply";
import ApplySuccess from "./pages/ApplySuccess";
import ApplyClosed from "./pages/ApplyClosed";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ApplicationForm from "./pages/ApplicationForm";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check login status on load
  useEffect(() => {
    const authStatus =
      localStorage.getItem("isAuthenticated") === "true" ||
      localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isLoggedIn");
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  // ✅ Redirect logged-in users away from login page automatically
  const RedirectIfLoggedIn = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    if (isAuthenticated && location.pathname === "/login") {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  };

  const AppContent = () => {
    // Render all routes with layout (Navbar + Footer)
    return (
      <RedirectIfLoggedIn>
        <div className="flex flex-col min-h-screen">
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <Jobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/new"
                element={
                  <ProtectedRoute>
                    <CreateJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:jobId"
                element={
                  <ProtectedRoute>
                    <JobDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:jobId/shortlist"
                element={
                  <ProtectedRoute>
                    <Shortlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route path="/apply/:jobId" element={<Apply />} />
              <Route path="/apply/:jobId/success" element={<ApplySuccess />} />
              <Route path="/apply/:jobId/closed" element={<ApplyClosed />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </RedirectIfLoggedIn>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/job/apply" element={<ApplicationForm />} />
            <Route path="*" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
