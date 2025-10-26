import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { Briefcase, Users, CheckCircle, PlusCircle, ListChecks } from "lucide-react";
import { jobs, applicants } from "@/data/dummyData";

const Dashboard = () => {
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(job => job.status === "Open").length;
  const totalApplicants = applicants.length;
  const shortlistedCount = applicants.filter(app => app.isShortlisted).length;

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your recruitment pipeline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            icon={Briefcase}
            description={`${openJobs} open positions`}
          />
          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            icon={Users}
            description="Across all jobs"
          />
          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            icon={CheckCircle}
            description="Top candidates"
          />
          <StatCard
            title="Open Positions"
            value={openJobs}
            icon={ListChecks}
            description="Accepting applications"
          />
        </div>

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
                  Manage your job postings and review applicants
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
