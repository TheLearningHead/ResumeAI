import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jobs, applicants } from "@/data/dummyData";
import { ArrowLeft, Download, Award } from "lucide-react";
import { toast } from "sonner";

const Shortlist = () => {
  const { jobId } = useParams();
  const job = jobs.find(j => j.id === jobId);
  const jobApplicants = applicants
    .filter(app => app.jobId === jobId)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, job?.numToShortlist || 5);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job not found</h2>
          <Link to="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadCSV = () => {
    toast.success("CSV download would start here (placeholder)");
  };

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="container mx-auto px-4">
        <Link to={`/jobs/${jobId}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Job Details
          </Button>
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Shortlisted Candidates</CardTitle>
            </div>
            <CardDescription>
              Top {job.numToShortlist} candidates for {job.title}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Top Candidates ({jobApplicants.length})</CardTitle>
                <CardDescription>Ranked by AI match score</CardDescription>
              </div>
              <Button onClick={handleDownloadCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Resume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplicants.map((applicant, index) => (
                    <TableRow key={applicant.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <Badge variant={index === 0 ? "default" : "outline"}>
                            #{index + 1}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{applicant.name}</TableCell>
                      <TableCell>{applicant.email}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {applicant.experience}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${applicant.matchScore}%` }}
                            />
                          </div>
                          <span className="font-semibold text-primary">
                            {applicant.matchScore}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a href={applicant.resumeLink} className="text-primary hover:underline">
                          View
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shortlist;
