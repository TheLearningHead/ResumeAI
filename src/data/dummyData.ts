export interface Job {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: "Open" | "Closed";
  numToShortlist: number;
  applicationLink: string;
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

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    description: "We are looking for an experienced Full Stack Developer with expertise in React, Node.js, and AWS services. The ideal candidate will have 5+ years of experience building scalable web applications.",
    createdAt: "2025-01-15",
    status: "Open",
    numToShortlist: 5,
    applicationLink: "https://yourapp.com/apply/1"
  },
  {
    id: "2",
    title: "Cloud Solutions Architect",
    description: "Seeking a Cloud Solutions Architect with deep knowledge of AWS services including Lambda, DynamoDB, S3, and CloudFormation. Must have experience designing serverless architectures.",
    createdAt: "2025-01-10",
    status: "Open",
    numToShortlist: 3,
    applicationLink: "https://yourapp.com/apply/2"
  },
  {
    id: "3",
    title: "Machine Learning Engineer",
    description: "Join our AI team to build cutting-edge ML models for resume analysis and candidate matching. Experience with NLP and TensorFlow required.",
    createdAt: "2025-01-05",
    status: "Closed",
    numToShortlist: 4,
    applicationLink: "https://yourapp.com/apply/3"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    description: "Looking for a DevOps Engineer to manage our CI/CD pipelines and AWS infrastructure. Experience with Docker, Kubernetes, and Terraform is essential.",
    createdAt: "2024-12-28",
    status: "Open",
    numToShortlist: 3,
    applicationLink: "https://yourapp.com/apply/4"
  },
  {
    id: "5",
    title: "Frontend Developer (React)",
    description: "Seeking a talented Frontend Developer with strong React and TypeScript skills. You'll be building beautiful, responsive user interfaces for our SaaS platform.",
    createdAt: "2024-12-20",
    status: "Open",
    numToShortlist: 6,
    applicationLink: "https://yourapp.com/apply/5"
  }
];

export const applicants: Applicant[] = [
  // Job 1 applicants
  {
    id: "a1",
    jobId: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    experience: "7 years of full stack development experience with React, Node.js, and AWS. Led development of 3 major SaaS products.",
    matchScore: 95,
    resumeLink: "#",
    appliedAt: "2025-01-16",
    isShortlisted: true
  },
  {
    id: "a2",
    jobId: "1",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    experience: "5 years building scalable web applications. Expert in React, TypeScript, and cloud infrastructure.",
    matchScore: 92,
    resumeLink: "#",
    appliedAt: "2025-01-16",
    isShortlisted: true
  },
  {
    id: "a3",
    jobId: "1",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    experience: "6 years full stack development. Strong background in microservices and AWS Lambda.",
    matchScore: 88,
    resumeLink: "#",
    appliedAt: "2025-01-17",
    isShortlisted: true
  },
  {
    id: "a4",
    jobId: "1",
    name: "David Kim",
    email: "david.kim@email.com",
    experience: "4 years of web development. Familiar with React and Node.js, learning AWS.",
    matchScore: 78,
    resumeLink: "#",
    appliedAt: "2025-01-17",
    isShortlisted: true
  },
  {
    id: "a5",
    jobId: "1",
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    experience: "8 years software engineering. Expert in backend development and distributed systems.",
    matchScore: 85,
    resumeLink: "#",
    appliedAt: "2025-01-18",
    isShortlisted: true
  },
  {
    id: "a6",
    jobId: "1",
    name: "James Brown",
    email: "james.brown@email.com",
    experience: "3 years full stack development. Strong React skills, basic AWS knowledge.",
    matchScore: 72,
    resumeLink: "#",
    appliedAt: "2025-01-18",
    isShortlisted: false
  },
  // Job 2 applicants
  {
    id: "a7",
    jobId: "2",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    experience: "10 years cloud architecture experience. AWS certified solutions architect with expertise in serverless design.",
    matchScore: 98,
    resumeLink: "#",
    appliedAt: "2025-01-11",
    isShortlisted: true
  },
  {
    id: "a8",
    jobId: "2",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    experience: "7 years designing cloud solutions. Deep knowledge of AWS Lambda, DynamoDB, and infrastructure as code.",
    matchScore: 94,
    resumeLink: "#",
    appliedAt: "2025-01-12",
    isShortlisted: true
  },
  {
    id: "a9",
    jobId: "2",
    name: "William Martinez",
    email: "william.m@email.com",
    experience: "5 years cloud engineering. Experience with AWS, Azure, and multi-cloud architectures.",
    matchScore: 89,
    resumeLink: "#",
    appliedAt: "2025-01-13",
    isShortlisted: true
  },
  {
    id: "a10",
    jobId: "2",
    name: "Amanda White",
    email: "amanda.white@email.com",
    experience: "4 years DevOps and cloud infrastructure. Growing expertise in AWS services.",
    matchScore: 76,
    resumeLink: "#",
    appliedAt: "2025-01-14",
    isShortlisted: false
  },
  // Job 4 applicants
  {
    id: "a11",
    jobId: "4",
    name: "Chris Anderson",
    email: "chris.anderson@email.com",
    experience: "6 years DevOps engineering. Expert in Docker, Kubernetes, CI/CD pipelines, and AWS infrastructure.",
    matchScore: 93,
    resumeLink: "#",
    appliedAt: "2024-12-29",
    isShortlisted: true
  },
  {
    id: "a12",
    jobId: "4",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    experience: "5 years building and managing cloud infrastructure. Strong Terraform and automation skills.",
    matchScore: 90,
    resumeLink: "#",
    appliedAt: "2024-12-30",
    isShortlisted: true
  },
  {
    id: "a13",
    jobId: "4",
    name: "Thomas Wilson",
    email: "thomas.wilson@email.com",
    experience: "4 years DevOps experience. Proficient in Docker and AWS, learning Kubernetes.",
    matchScore: 82,
    resumeLink: "#",
    appliedAt: "2024-12-31",
    isShortlisted: true
  },
  {
    id: "a14",
    jobId: "4",
    name: "Jessica Moore",
    email: "jessica.moore@email.com",
    experience: "3 years in DevOps. Good understanding of CI/CD principles and containerization.",
    matchScore: 75,
    resumeLink: "#",
    appliedAt: "2025-01-02",
    isShortlisted: false
  },
  // Job 5 applicants
  {
    id: "a15",
    jobId: "5",
    name: "Daniel Thompson",
    email: "daniel.t@email.com",
    experience: "5 years React development. Expert in TypeScript, modern React patterns, and building responsive UIs.",
    matchScore: 96,
    resumeLink: "#",
    appliedAt: "2024-12-21",
    isShortlisted: true
  },
  {
    id: "a16",
    jobId: "5",
    name: "Sophia Martinez",
    email: "sophia.martinez@email.com",
    experience: "4 years frontend development. Strong React and CSS skills, passionate about UX design.",
    matchScore: 91,
    resumeLink: "#",
    appliedAt: "2024-12-22",
    isShortlisted: true
  },
  {
    id: "a17",
    jobId: "5",
    name: "Kevin Harris",
    email: "kevin.harris@email.com",
    experience: "6 years building web applications. Expert in React, Vue, and modern frontend tools.",
    matchScore: 89,
    resumeLink: "#",
    appliedAt: "2024-12-23",
    isShortlisted: true
  },
  {
    id: "a18",
    jobId: "5",
    name: "Olivia Clark",
    email: "olivia.clark@email.com",
    experience: "3 years React development. Good TypeScript knowledge and growing expertise in component libraries.",
    matchScore: 84,
    resumeLink: "#",
    appliedAt: "2024-12-24",
    isShortlisted: true
  },
  {
    id: "a19",
    jobId: "5",
    name: "Ryan Lewis",
    email: "ryan.lewis@email.com",
    experience: "4 years frontend engineering. Strong in JavaScript, learning React and TypeScript.",
    matchScore: 79,
    resumeLink: "#",
    appliedAt: "2024-12-25",
    isShortlisted: true
  },
  {
    id: "a20",
    jobId: "5",
    name: "Emma Walker",
    email: "emma.walker@email.com",
    experience: "2 years web development. Basic React knowledge, eager to learn.",
    matchScore: 68,
    resumeLink: "#",
    appliedAt: "2024-12-26",
    isShortlisted: true
  }
];
