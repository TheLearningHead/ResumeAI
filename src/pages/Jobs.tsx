import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";
import axios from "axios";

/* ============ Types ============ */
interface Job {
  jobId: string;
  title: string;
  description: string;
  createdAt: string;
  numShortlist?: number;
  companyId?: string;
  status?: "Open" | "Closed";
  applicationLink?: string;
}

interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  experience: string;
  matchScore: number;
  resumeLink: string;
  appliedAt: string;
  isShortlisted: boolean;
}

/* ============ API Helpers ============ */
const API_BASE_URL = "https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com";

// ✅ Fetch all jobs
const getJobs = async (): Promise<Job[]> => {
  const companyId = localStorage.getItem("companyId");
  const res = await axios.get(`${API_BASE_URL}/company/${companyId}/jobs`);

  // ✅ Safely extract jobs array
  if (Array.isArray(res.data)) return res.data;
  if (res.data && Array.isArray(res.data.jobs)) return res.data.jobs;
  console.warn("⚠️ Unexpected jobs API response:", res.data);
  return [];
};

// ✅ Fetch applicants by jobId
const getApplicantsByJobId = async (jobId: string): Promise<Applicant[]> => {
  const res = await axios.get(`${API_BASE_URL}/job/${jobId}/applications`);
  return res.data;
};

/* ============ Component ============ */
const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (err) {
        console.error("❌ Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobClick = async (jobId: string) => {
    try {
      const applicants = await getApplicantsByJobId(jobId);
      console.log("📋 Applicants for job", jobId, ":", applicants);
    } catch (err) {
      console.error(`❌ Failed to fetch applicants for job ${jobId}:`, err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading jobs...</p>
      </div>
    );
  }

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

        {jobs.length === 0 ? (
          <p className="text-center text-muted-foreground mt-12">
            No jobs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <Card
                key={job.jobId}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleJobClick(job.jobId)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge
                          variant={
                            job.status === "Closed" ? "secondary" : "default"
                          }
                        >
                          {job.status || "Open"}
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
                        <span>
                          Posted{" "}
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/jobs/${job.jobId}`}>
                        <Button variant="default">View Applicants</Button>
                      </Link>
                      {job.applicationLink && (
                        <a
                          href={job.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
