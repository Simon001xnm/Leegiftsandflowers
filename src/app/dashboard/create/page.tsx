
"use client";

import { useState, useTransition } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Sparkles, Loader2, Save, X, Tags } from "lucide-react";
import { generateEventDescription } from "@/ai/flows/generate-event-description";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function CreateEventPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "",
    keyDetails: "",
    targetAudience: "",
  });

  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    description: string;
    keywords: string[];
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventCategory: value }));
  };

  const handleAiGeneration = () => {
    if (!formData.eventName || !formData.eventCategory || !formData.keyDetails) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in the draft name, category, and key details first.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateEventDescription(formData);
        setGeneratedContent({
          title: result.generatedTitle,
          description: result.generatedDescription,
          keywords: result.optimizedKeywords,
        });
        toast({
          title: "AI Suggestion Ready!",
          description: "We've generated a title and description for your event.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "There was an error generating content. Please try again.",
        });
      }
    });
  };

  const applyAiContent = () => {
    if (generatedContent) {
      setFormData(prev => ({
        ...prev,
        eventName: generatedContent.title,
        keyDetails: generatedContent.description
      }));
      setGeneratedContent(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-headline text-primary mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the basic details or use our AI assistant to craft the perfect listing.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Event Basics</CardTitle>
                <CardDescription>Start with the fundamental information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name / Draft Title</Label>
                  <Input 
                    id="eventName" 
                    name="eventName" 
                    placeholder="e.g., Summer Jazz Night" 
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventCategory">Category</Label>
                  <Select onValueChange={handleCategoryChange} value={formData.eventCategory}>
                    <SelectTrigger id="eventCategory" className="h-12">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Music">Music</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
                  <Input 
                    id="targetAudience" 
                    name="targetAudience" 
                    placeholder="e.g., Music lovers, Tech professionals" 
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyDetails">Description & Key Details</Label>
                  <Textarea 
                    id="keyDetails" 
                    name="keyDetails" 
                    placeholder="Tell us what makes this event special, include dates, location, and what attendees can expect..." 
                    rows={8}
                    value={formData.keyDetails}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 pt-6 rounded-b-lg border-t flex justify-between">
                <Button variant="ghost" className="gap-2">
                  <X className="w-4 h-4" /> Discard
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="secondary" 
                    className="gap-2 border-2 border-primary/10" 
                    onClick={handleAiGeneration}
                    disabled={isPending}
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-primary" />}
                    Generate with AI
                  </Button>
                  <Button className="gap-2 px-8">
                    <Save className="w-4 h-4" /> Create Event
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {generatedContent ? (
                <Card className="border-accent bg-accent/5 shadow-xl animate-in zoom-in-95 duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-bold text-sm tracking-widest uppercase">AI Recommendation</span>
                    </div>
                    <CardTitle className="text-xl font-headline leading-tight">{generatedContent.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {generatedContent.description.substring(0, 250)}...
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <Label className="text-xs uppercase text-muted-foreground flex items-center gap-2">
                        <Tags className="w-3 h-3" /> Optimized Keywords
                      </Label>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedContent.keywords.map(kw => (
                          <Badge key={kw} variant="secondary" className="bg-background/80 text-[10px] px-2 py-0">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full gap-2 bg-accent hover:bg-accent/90" onClick={applyAiContent}>
                      Use This Content
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="border-dashed border-2 bg-muted/20">
                  <CardContent className="py-12 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                      <Wand2 className="w-6 h-6 text-primary/40" />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-[200px]">
                      AI suggestions will appear here after you click "Generate with AI"
                    </p>
                  </CardContent>
                </Card>
              )}
              
              <div className="bg-secondary/40 rounded-xl p-6 border border-primary/5">
                <h3 className="font-bold text-sm text-primary uppercase tracking-wider mb-4">Pro Tips</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    Be specific about the venue location.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    List exactly what the ticket includes.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    Use AI to refine your tone of voice.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
