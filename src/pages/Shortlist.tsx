import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Download, Award } from "lucide-react";
import { toast } from "sonner";
import { getJobs, Job, Applicant } from "@/lib/data";

const Shortlist = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!jobId) return;

      try {
        const jobsData = await getJobs();

        let jobList: Job[] = [];
        if (Array.isArray((jobsData as any)?.jobs)) jobList = (jobsData as any).jobs;
        else if (Array.isArray(jobsData)) jobList = jobsData;

        const foundJob = jobList.find((j) => j.jobId === jobId) || null;
        setJob(foundJob);
        if (!foundJob) return;

        const companyId = foundJob.companyId; // must exist

        // === CALL BACKEND SHORTLIST API ===
        const res = await axios.get(
          `https://0kz8hifp09.execute-api.ap-south-1.amazonaws.com/shortlist/${jobId}/${companyId}`
        );

        const normalized: Applicant[] = res.data.shortlisted.map((x: any) => ({
          id: x.applicationId,
          jobId: x.jobId,
          name: x.name,
          email: x.email,
          resumeLink: x.resumeLink,
          matchScore: x.matchScore,
          experience: x.experience,
          appliedAt: x.appliedAt,
          isShortlisted: true,
        }));

        setApplicants(normalized);

      } catch (error) {
        console.error("❌ Error fetching shortlist:", error);
        toast.error("Failed to load shortlist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <p className="text-muted-foreground text-lg">Loading shortlist...</p>
      </div>
    );
  }

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
              Top {job.numShortlist} candidates for {job.title}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Top Candidates ({applicants.length})</CardTitle>
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
                  {applicants.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground py-8"
                      >
                        No shortlisted candidates yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    applicants.map((applicant, index) => (
                      <TableRow key={applicant.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Badge variant={index === 0 ? "default" : "outline"}>
                            #{index + 1}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {applicant.name}
                        </TableCell>
                        <TableCell>{applicant.email}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {applicant.experience}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {applicant.matchScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <a
                            href={applicant.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
