import { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Upload, User, Mail, Briefcase, CheckCircle } from "lucide-react";
import { apply } from "@/utils/apply";

const pdfToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

export default function ApplicationForm() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const cid = searchParams.get("companyId");

  const [job, setJob] = useState<any>(null); // <--- new
  const [resume, setResume] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState<boolean>(false);

  // load job detail
  useEffect(() => {
    if (!id) return;
    if (!cid) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com/job/${cid}/${id}`);

        setJob(res.data); // ✅ because response body IS the job object
      } catch (err) {
        console.error("❌ error loading job", err);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    if (id) {
      const appliedKey = `applied_${id}`;
      const hasApplied = localStorage.getItem(appliedKey) === "true";
      setHasAlreadyApplied(hasApplied);
    }
  }, [id]);

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasAlreadyApplied) return;
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setResume(file);
      try {
        const base64 = await pdfToBase64(file);
        setResumeBase64(base64);
      } catch (error) {
        alert('Error processing file. Please try again.');
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (hasAlreadyApplied) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    if (hasAlreadyApplied) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setResume(file);
      try {
        const base64 = await pdfToBase64(file);
        setResumeBase64(base64);
      } catch (error) {
        alert('Error processing file. Please try again.');
      }
    }
  };

  const handleSubmit = async () => {
    if (hasAlreadyApplied) {
      alert("You have already applied for this position.");
      return;
    }

    if (!id) {
      alert("Invalid application ID.");
      return;
    }

    if (!resume || !name || !email) {
      alert("Please fill in all fields and upload your resume.");
      return;
    }

    if (!email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const application = {
        jobId: id,
        candidateName: name,
        candidateEmail: email,
        resumeBase64: resumeBase64,
        resumeName: resume.name,
        resumeType: resume.type,
      };

      const response = await apply(application);

      if (response) {
        const appliedKey = `applied_${id}`;
        localStorage.setItem(appliedKey, "true");
        setHasAlreadyApplied(true);

        alert("Application submitted successfully!");
        setName("");
        setEmail("");
        setResume(null);
        setResumeBase64(null);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">Job Application</h1>
            </div>
            {id && (
              <p className="text-blue-100 mt-2 text-sm">Application ID: {id}</p>
            )}
          </div>

          {/* Form */}
          <div className="px-8 py-8 space-y-6">

            {/* NEW job display */}
            {job && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <p className="text-lg font-semibold text-gray-800">{job.title}</p>
                <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                {job.companyName && (
                  <p className="text-sm text-gray-500 mt-1">Company: {job.companyName}</p>
                )}
              </div>
            )}

            {hasAlreadyApplied ? (
              /* Already Applied Message */
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Already Submitted</h2>
                <p className="text-gray-600 mb-4">
                  You have already submitted an application for this position.
                </p>
                <p className="text-sm text-gray-500">
                  We have received your application and will review it shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                    disabled={hasAlreadyApplied}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="john.doe@example.com"
                    disabled={hasAlreadyApplied}
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Resume (PDF only, max 5MB)</span>
                  </label>

                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${hasAlreadyApplied
                        ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                        : dragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf"
                      onChange={handleResumeChange}
                      disabled={hasAlreadyApplied}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />

                    <div className="text-center pointer-events-none">
                      <Upload className={`mx-auto w-12 h-12 ${dragActive && !hasAlreadyApplied ? "text-blue-500" : "text-gray-400"}`} />
                      <p className="mt-2 text-sm text-gray-600">
                        {resume ? (
                          <span className="text-green-600 font-medium">✓ {resume.name}</span>
                        ) : (
                          <>
                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">PDF up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || hasAlreadyApplied}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By submitting this application, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
}