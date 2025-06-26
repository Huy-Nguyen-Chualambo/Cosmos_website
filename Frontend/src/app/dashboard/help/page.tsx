"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface Guide {
  title: string;
  description: string;
  steps: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs: FAQ[] = [
    {
      question: "How do I start observing celestial objects?",
      answer: "Begin by familiarizing yourself with the night sky using our Explore section. Start with naked-eye objects like planets and bright stars, then progress to using telescopes for more detailed observations.",
      category: "Getting Started",
    },
    {
      question: "What equipment do I need?",
      answer: "For beginners, start with a star chart and a red flashlight. As you progress, consider investing in binoculars or a small telescope. Our equipment guide provides detailed recommendations.",
      category: "Equipment",
    },
    {
      question: "How can I track my observations?",
      answer: "Use our Bookmarks feature to save and organize celestial objects you've observed. You can add notes, create collections, and track your viewing history.",
      category: "Features",
    },
  ];

  const guides: Guide[] = [
    {
      title: "Getting Started with COSMOS",
      description: "Learn the basics of using COSMOS for space exploration",
      difficulty: "Beginner",
      steps: [
        "Create your account and set up your profile",
        "Explore the dashboard features",
        "Start with the Overview section",
        "Learn to use the Wiki Objects database",
      ],
    },
    {
      title: "Advanced Observation Techniques",
      description: "Master the art of celestial observation",
      difficulty: "Intermediate",
      steps: [
        "Understanding celestial coordinates",
        "Using filters and equipment",
        "Recording detailed observations",
        "Sharing your findings with the community",
      ],
    },
  ];

  const filteredFAQs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGuides = guides.filter(
    guide =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white/90">Help Center</h1>
        <p className="text-muted-foreground mt-2">
          Find answers and learn how to use COSMOS
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search help articles..."
          className="pl-8 bg-white/10 border-white/20 text-white/90"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white/90">
            Frequently Asked Questions
          </h2>
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white/90">{faq.question}</CardTitle>
                <CardDescription className="text-white/70">{faq.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white/90">
            Guides & Tutorials
          </h2>
          {filteredGuides.map((guide, index) => (
            <Card key={index} className="bg-white/10 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white/90">{guide.title}</CardTitle>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    guide.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400"
                      : guide.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {guide.difficulty}
                  </span>
                </div>
                <CardDescription className="text-white/70">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-white/70">
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-8 bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white/90">Still Need Help?</CardTitle>
          <CardDescription className="text-white/70">
            Contact our support team for personalized assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white/90">Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
                  Send us an email at support@cosmos.com
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white/90">Community Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
                  Join our community forum to discuss with other astronomers
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 