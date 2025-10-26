import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Database, Zap, Brain, Lock, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About ResumeAI</h1>
            <p className="text-xl text-muted-foreground">
              Cloud-native recruitment platform powered by AWS and AI
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <p className="text-muted-foreground mb-4">
                ResumeAI is a cloud-native application demonstrating AWS serverless architecture 
                with advanced AI-powered resume shortlisting capabilities. This platform showcases 
                modern cloud computing principles and automated candidate evaluation.
              </p>
              <p className="text-muted-foreground">
                Built as a college-level AWS project, this application demonstrates the power of 
                serverless computing, scalable architecture, and machine learning integration in 
                solving real-world hiring challenges.
              </p>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Cloud className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">Amazon S3</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scalable object storage for resume files and application data
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Zap className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">AWS Lambda</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Serverless compute for processing applications and AI analysis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Database className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">DynamoDB</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    NoSQL database for fast, flexible data storage and retrieval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Brain className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">AI Matching</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Machine learning algorithms for intelligent candidate evaluation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <Lock className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">AWS Cognito</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Secure user authentication and authorization management
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <TrendingUp className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">CloudWatch</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monitoring, logging, and performance analytics
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Automated resume collection through shareable links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>AI-powered candidate matching and scoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Automatic shortlisting based on configurable criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Real-time dashboard with recruitment analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Serverless architecture for cost optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Scalable infrastructure handling thousands of applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                Try the Platform
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
