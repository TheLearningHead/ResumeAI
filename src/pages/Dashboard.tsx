import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { Briefcase, PlusCircle, ListChecks } from "lucide-react";
import { toast } from "sonner";
import { getJobs, Job } from "@/lib/data"; // ✅ backend API

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();

        // ✅ Handle Lambda shape { jobs: [...] }
        if (Array.isArray((jobsData as any)?.jobs)) {
          setJobs((jobsData as any).jobs);
        } else if (Array.isArray(jobsData)) {
          setJobs(jobsData);
        } else {
          console.warn("⚠️ Unexpected jobs format:", jobsData);
          setJobs([]);
        }
      } catch (error) {
        console.error("❌ Error loading jobs:", error);
        toast.error("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <p className="text-muted-foreground text-lg">Loading dashboard...</p>
      </div>
    );
  }

  // ✅ Calculate stats safely
  const totalJobs = jobs.length;
  // You can later add a real “open/closed” field if backend supports it
  const openJobs = totalJobs; // temporarily treat all as open

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your job postings
          </p>
        </div>

        {/* ✅ Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            icon={Briefcase}
            description="All job postings"
          />
          <StatCard
            title="Open Positions"
            value={openJobs}
            icon={ListChecks}
            description="Currently accepting applications"
          />
        </div>

        {/* ✅ Actions section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/jobs/new">
            <div className="p-8 bg-card rounded-lg border-2 border-dashed border-muted hover:border-primary hover:shadow-md transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-accent rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                  <PlusCircle className="h-8 w-8 text-accent-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create New Job</h3>
                <p className="text-muted-foreground">
                  Post a new position and generate an application link
                </p>
              </div>
            </div>
          </Link>

          <Link to="/jobs">
            <div className="p-8 bg-card rounded-lg border-2 border-dashed border-muted hover:border-primary hover:shadow-md transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-accent rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                  <Briefcase className="h-8 w-8 text-accent-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">View All Jobs</h3>
                <p className="text-muted-foreground">
                  Manage your job postings
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
