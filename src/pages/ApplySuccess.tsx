import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ApplySuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription>
            Thank you for applying. We've received your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent rounded-lg">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Our AI will analyze your resume against the job requirements</li>
              <li>• Top candidates will be automatically shortlisted</li>
              <li>• Our team will review shortlisted applications</li>
              <li>• We'll get back to you within 1-2 weeks</li>
            </ul>
          </div>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplySuccess;
