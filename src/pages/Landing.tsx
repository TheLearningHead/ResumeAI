import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Zap, Target, Shield, TrendingUp, Users } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-accent to-background py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            AI-Powered Resume Shortlisting Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate a link, collect resumes, and let AI shortlist the best candidates. 
            Built on AWS cloud infrastructure for scalability and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ResumeAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                  <Cloud className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cloud-Native</h3>
                <p className="text-muted-foreground">
                  Built on AWS with S3, Lambda, and DynamoDB for unlimited scalability and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                  <Zap className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Serverless</h3>
                <p className="text-muted-foreground">
                  Automatic scaling with zero infrastructure management. Pay only for what you use.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                  <Target className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Matched Hiring</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms analyze and rank candidates based on job requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with encrypted storage and secure access controls.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                  <TrendingUp className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                <p className="text-muted-foreground">
                  Track application metrics and candidate scores in real-time dashboards.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                <p className="text-muted-foreground">
                  Generate shareable links for job postings. Candidates apply with one click.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join companies using AI to find the best talent faster.
          </p>
          <Link to="/login">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
