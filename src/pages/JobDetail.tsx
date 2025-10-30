import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, ExternalLink, Award } from "lucide-react";
import { toast } from "sonner";
import { getJobs, getApplicantsByJobId, Job } from "@/lib/data";

// Define the Applicant type to match your backend response
interface Applicant {
  applicationId: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  resumeUrl: string;
  appliedAt: string;
  matchScore?: number; // optional (not in backend yet)
  isShortlisted?: boolean;
}

const JobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [jobApplicants, setJobApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      if (!jobId) return;

      try {
        const [jobsData, applicantsData] = await Promise.all([
          getJobs(),
          getApplicantsByJobId(jobId),
        ]);

        // ✅ Handle { jobs: [...] } or direct array
        let jobList: Job[] = [];
        if (Array.isArray((jobsData as any)?.jobs)) {
          jobList = (jobsData as any).jobs;
        } else if (Array.isArray(jobsData)) {
          jobList = jobsData;
        }

        const foundJob = jobList.find((j) => j.jobId === jobId) || null;

        // ✅ Extract applications safely
        const applicantList = Array.isArray((applicantsData as any)?.applications)
          ? (applicantsData as any).applications
          : Array.isArray(applicantsData)
          ? applicantsData
          : [];

        setJob(foundJob);
        setJobApplicants(applicantList);
      } catch (err) {
        console.error("❌ Error fetching job details:", err);
        toast.error("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndApplicants();
  }, [jobId]);

  const handleShortlist = () => {
    if (!job) return;
    toast.success(
      `Top ${job.numShortlist} candidates shortlisted based on AI match scores!`
    );
    navigate(`/jobs/${jobId}/shortlist`);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-success">Excellent</Badge>;
    if (score >= 80) return <Badge className="bg-primary">Good</Badge>;
    if (score >= 70) return <Badge variant="secondary">Fair</Badge>;
    return <Badge variant="outline">Low</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading job details...</p>
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

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="container mx-auto px-4">
        <Link to="/jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        {/* ✅ Job Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                </div>
                <CardDescription>
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>

              {job.companyId && (
                <a
                  href={`https://example.com/apply/${job.jobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Application Link
                  </Button>
                </a>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground mb-4">{job.description}</p>
            <p className="text-sm text-muted-foreground">
              Shortlist top{" "}
              <span className="font-semibold">{job.numShortlist}</span>{" "}
              candidates
            </p>
          </CardContent>
        </Card>

        {/* ✅ Applicants Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Applicants ({jobApplicants.length})</CardTitle>
                <CardDescription>
                  Review and shortlist candidates
                </CardDescription>
              </div>
              <Button onClick={handleShortlist}>
                <Award className="h-4 w-4 mr-2" />
                Shortlist Top {job.numShortlist}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {jobApplicants.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground py-8"
                      >
                        No applicants yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    jobApplicants
                      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
                      .map((applicant) => (
                        <TableRow
                          key={applicant.applicationId}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {applicant.candidateName}
                          </TableCell>
                          <TableCell>{applicant.candidateEmail}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {applicant.matchScore ?? 0}%
                              </span>
                              {getScoreBadge(applicant.matchScore ?? 0)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <a
                              href={applicant.resumeUrl}
                              className="text-primary hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          </TableCell>
                          <TableCell>
                            {applicant.isShortlisted ? (
                              <Badge className="bg-success">Shortlisted</Badge>
                            ) : (
                              <Badge variant="outline">Under Review</Badge>
                            )}
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

export default JobDetail;
