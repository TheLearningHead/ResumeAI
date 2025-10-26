import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, CheckCircle } from "lucide-react";

const CreateJob = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numToShortlist, setNumToShortlist] = useState("5");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !numToShortlist) {
      toast.error("Please fill in all fields");
      return;
    }

    const jobId = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/apply/${jobId}`;
    setGeneratedLink(link);
    toast.success("Job created successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Job</h1>
          <p className="text-muted-foreground">
            Post a new position and generate a shareable application link
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Fill in the information about the position you're hiring for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Full Stack Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, requirements, and responsibilities..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numToShortlist">Number of Candidates to Shortlist</Label>
                <Input
                  id="numToShortlist"
                  type="number"
                  min="1"
                  placeholder="5"
                  value={numToShortlist}
                  onChange={(e) => setNumToShortlist(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  AI will automatically shortlist the top X candidates based on match score
                </p>
              </div>

              <Button type="submit" className="w-full">
                Generate Application Link
              </Button>
            </form>

            {generatedLink && (
              <div className="mt-6 p-4 bg-accent rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Application link generated!</span>
                </div>
                <div className="flex gap-2">
                  <Input value={generatedLink} readOnly className="flex-1" />
                  <Button onClick={copyToClipboard} variant="outline" size="icon">
                    <Copy className={`h-4 w-4 ${copied ? 'text-success' : ''}`} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this link with candidates to collect applications
                </p>
                <Button 
                  onClick={() => navigate("/jobs")} 
                  variant="outline" 
                  className="w-full"
                >
                  View All Jobs
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateJob;
