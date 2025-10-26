import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const ApplyClosed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Applications Closed</CardTitle>
          <CardDescription>
            This job is no longer accepting applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Unfortunately, this position has been filled or the application period has ended. 
            Please check back for other opportunities.
          </p>
          <Link to="/">
            <Button className="w-full">
              Browse Other Jobs
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyClosed;
