import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, LogOut } from "lucide-react";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar = ({ isAuthenticated, onLogout }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("companyId");
    localStorage.removeItem("isLoggedIn");
    onLogout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors">
            <Briefcase className="h-6 w-6 text-primary" />
            ResumeAI
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/dashboard") ? "text-primary" : "text-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/jobs"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/jobs") ? "text-primary" : "text-foreground"
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/jobs/new"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/jobs/new") ? "text-primary" : "text-foreground"
                }`}
              >
                Create Job
              </Link>
              <Link
                to="/settings"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/settings") ? "text-primary" : "text-foreground"
                }`}
              >
                Settings
              </Link>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
