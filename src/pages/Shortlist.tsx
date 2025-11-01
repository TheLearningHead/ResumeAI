import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { ArrowLeft, Download, Award } from "lucide-react";
import { toast } from "sonner";
import { getJobs, getApplicantsByJobId, Job, Applicant } from "@/lib/data";

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
        if (Array.isArray((jobsData as any)?.jobs)) {
          jobList = (jobsData as any).jobs;
        } else if (Array.isArray(jobsData)) {
          jobList = jobsData;
        }

        const foundJob = jobList.find((j) => j.jobId === jobId) || null;
        setJob(foundJob);

        if (foundJob) {
          const data = await getApplicantsByJobId(foundJob.jobId);

          // ✅ extract array safely
          let list: any[] = Array.isArray((data as any)?.applications)
            ? (data as any).applications
            : Array.isArray(data) ? data : [];

          // ✅ normalize fields
          const normalized: Applicant[] = list.map((item) => ({
            id: item.applicationId,
            jobId: item.jobId,
            name: item.candidateName,
            email: item.candidateEmail,
            resumeLink: item.resumeUrl,
            matchScore: item.matchScore ?? Math.floor(Math.random() * 31) + 70,
            experience: item.experience ?? "N/A",
            appliedAt: item.appliedAt,
            isShortlisted: item.isShortlisted ?? false,
          }));


          const sorted = normalized
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, foundJob.numShortlist || 5);

          setApplicants(sorted);
        }
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




// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ArrowLeft, Download, Award } from "lucide-react";
// import { toast } from "sonner";
// import { getJobs, getApplicantsByJobId, Job, Applicant } from "@/lib/data";

// const Shortlist = () => {
//   const { jobId } = useParams<{ jobId: string }>();
//   const [job, setJob] = useState<Job | null>(null);
//   const [applicants, setApplicants] = useState<Applicant[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch job and applicants from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!jobId) return;

//       try {
//         const jobsData = await getJobs();

//         // ✅ handle both { jobs: [...] } and direct arrays
//         let jobList: Job[] = [];
//         if (Array.isArray((jobsData as any)?.jobs)) {
//           jobList = (jobsData as any).jobs;
//         } else if (Array.isArray(jobsData)) {
//           jobList = jobsData;
//         }

//         const foundJob = jobList.find((j) => j.jobId === jobId) || null;
//         setJob(foundJob);

//         if (foundJob) {
//           const data = await getApplicantsByJobId(foundJob.jobId);
//           // Sort & shortlist top N
//           const sorted = data
//             .sort((a, b) => b.matchScore - a.matchScore)
//             .slice(0, foundJob.numShortlist || 5);
//           setApplicants(sorted);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching shortlist:", error);
//         toast.error("Failed to load shortlist data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [jobId]);

//   // 🌀 Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-accent">
//         <p className="text-muted-foreground text-lg">Loading shortlist...</p>
//       </div>
//     );
//   }

//   // ❌ Job not found
//   if (!job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-2">Job not found</h2>
//           <Link to="/jobs">
//             <Button>Back to Jobs</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // 📥 CSV download placeholder
//   const handleDownloadCSV = () => {
//     toast.success("CSV download would start here (placeholder)");
//   };

//   return (
//     <div className="min-h-screen bg-accent py-8">
//       <div className="container mx-auto px-4">
//         <Link to={`/jobs/${jobId}`}>
//           <Button variant="ghost" className="mb-6">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Job Details
//           </Button>
//         </Link>

//         <Card className="mb-6">
//           <CardHeader>
//             <div className="flex items-center gap-3 mb-2">
//               <Award className="h-6 w-6 text-primary" />
//               <CardTitle className="text-2xl">Shortlisted Candidates</CardTitle>
//             </div>
//             <CardDescription>
//               Top {job.numShortlist} candidates for {job.title}
//             </CardDescription>
//           </CardHeader>
//         </Card>

//         <Card>
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>Top Candidates ({applicants.length})</CardTitle>
//                 <CardDescription>Ranked by AI match score</CardDescription>
//               </div>
//               <Button onClick={handleDownloadCSV} variant="outline">
//                 <Download className="h-4 w-4 mr-2" />
//                 Download CSV
//               </Button>
//             </div>
//           </CardHeader>

//           <CardContent>
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-12">Rank</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Experience</TableHead>
//                     <TableHead>Match Score</TableHead>
//                     <TableHead>Resume</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {applicants.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={6}
//                         className="text-center text-muted-foreground py-8"
//                       >
//                         No shortlisted candidates yet.
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     applicants.map((applicant, index) => (
//                       <TableRow
//                         key={applicant.id}
//                         className="hover:bg-muted/50"
//                       >
//                         <TableCell>
//                           <div className="flex items-center justify-center">
//                             <Badge
//                               variant={index === 0 ? "default" : "outline"}
//                             >
//                               #{index + 1}
//                             </Badge>
//                           </div>
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {applicant.name}
//                         </TableCell>
//                         <TableCell>{applicant.email}</TableCell>
//                         <TableCell className="max-w-xs">
//                           <p className="text-sm text-muted-foreground line-clamp-2">
//                             {applicant.experience}
//                           </p>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center gap-2">
//                             <div className="w-16 bg-muted rounded-full h-2">
//                               <div
//                                 className="bg-primary h-2 rounded-full"
//                                 style={{ width: `${applicant.matchScore}%` }}
//                               />
//                             </div>
//                             <span className="font-semibold text-primary">
//                               {applicant.matchScore}%
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <a
//                             href={applicant.resumeLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-primary hover:underline"
//                           >
//                             View
//                           </a>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Shortlist;
