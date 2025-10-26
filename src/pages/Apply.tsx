import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { jobs } from "@/data/dummyData";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const Apply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === jobId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [fileName, setFileName] = useState("");

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Job Not Found</CardTitle>
            <CardDescription>This job posting doesn't exist</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (job.status === "Closed") {
    navigate(`/apply/${jobId}/closed`);
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !experience || !fileName) {
      toast.error("Please fill in all fields and upload your resume");
      return;
    }

    toast.success("Application submitted successfully!");
    navigate(`/apply/${jobId}/success`);
  };

  return (
    <div className="min-h-screen bg-accent py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Apply for {job.title}</CardTitle>
            <CardDescription>
              Fill out the form below to submit your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">About this position</h3>
              <p className="text-sm text-muted-foreground">{job.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience & Skills</Label>
                <Textarea
                  id="experience"
                  placeholder="Tell us about your relevant experience, skills, and why you're a great fit for this role..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label htmlFor="resume" className="flex-1">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        {fileName || "Click to upload your resume"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, or DOCX (max 10MB)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;
