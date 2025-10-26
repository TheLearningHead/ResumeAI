import { Link } from "react-router-dom";
import { Cloud, Database, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">ResumeAI</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered resume shortlisting platform built on AWS cloud infrastructure.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Technology</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-primary" />
                <span>AWS Cloud Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Serverless Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <span>AI-Powered Matching</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>Built with AWS Cloud & AI • © 2025 ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
