import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jobs, applicants } from "@/data/dummyData";
import { Calendar, Users, ExternalLink } from "lucide-react";

const Jobs = () => {
  const getApplicantCount = (jobId: string) => {
    return applicants.filter(app => app.jobId === jobId).length;
  };

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Jobs</h1>
            <p className="text-muted-foreground">
              Manage your job postings and view applicants
            </p>
          </div>
          <Link to="/jobs/new">
            <Button>Create New Job</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <Badge variant={job.status === "Open" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {job.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {job.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{getApplicantCount(job.id)} applicants</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="default">
                        View Applicants
                      </Button>
                    </Link>
                    <a 
                      href={job.applicationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
