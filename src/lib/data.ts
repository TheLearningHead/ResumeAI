import axios from "axios";

/* ============
   Type Definitions
   ============ */

export interface Job {
  jobId: string;
  title: string;
  description: string;
  createdAt: string;
  numShortlist: number;
  companyId: string;
}


export interface Applicant {
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

/* ============
   API Base URL
   ============ */

// Prefer environment variable for flexibility
const API_BASE_URL = "https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com";

/* ============
   Axios Instance
   ============ */

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/* ============
   API Functions
   ============ */

/**
 * Fetch all jobs for a company
 */
export const getJobs = async (): Promise<Job[]> => {
  try {
    const companyId = localStorage.getItem("companyId");
    if (!companyId) {
      throw new Error("Company ID not found in localStorage");
    }

    const response = await api.get<Job[]>(`/company/${companyId}/jobs`);
    console.log("✅ Jobs fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching jobs:", error.message || error);
    return [];
  }
};

/**
 * Fetch all applicants
 */
// export const getApplicants = async (): Promise<Applicant[]> => {
//   try {
//     const response = await api.get<Applicant[]>("/applicants");
//     return response.data;
//   } catch (error: any) {
//     console.error("❌ Error fetching applicants:", error.message || error);
//     return [];
//   }
// };

/**
 * Fetch applicants for a specific job
 */
export const getApplicantsByJobId = async (
  jobId: string
): Promise<Applicant[]> => {
    

    try {
        const response = await api.get<Applicant[]>(`https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com/job/${jobId}/applications`);
        return response.data;
    } catch (error: any) {
        console.error(`❌ Error fetching applicants for job ${jobId}:`, error.message || error);
        return [];
    }
};

/* ============
   Example Usage (Optional)
   ============ */

(async () => {
  const jobs = await getJobs();
  console.log("📋 Job List:", jobs);
})();
