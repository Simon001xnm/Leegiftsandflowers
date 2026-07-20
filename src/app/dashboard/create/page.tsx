
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X, CircleCheck } from "lucide-react";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventCategory: "",
    keyDetails: "",
    targetAudience: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventCategory: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-bold font-headline text-primary mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details to launch your event listing.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Event Basics</CardTitle>
                <CardDescription>Fundamental information about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name</Label>
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
                  <Label htmlFor="keyDetails">Description & Details</Label>
                  <Textarea 
                    id="keyDetails" 
                    name="keyDetails" 
                    placeholder="Tell us what makes this event special..." 
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
                <Button className="gap-2 px-8 shadow-lg shadow-primary/20">
                  <Save className="w-4 h-4" /> Create Event
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-secondary/40 rounded-3xl p-8 border border-primary/5">
                <h3 className="font-bold text-lg text-primary uppercase tracking-wider mb-6">Listing Tips</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <CircleCheck className="w-5 h-5 text-accent shrink-0" />
                    <span>Include precise venue details and parking info.</span>
                  </li>
                  <li className="flex gap-3">
                    <CircleCheck className="w-5 h-5 text-accent shrink-0" />
                    <span>List all perks included in the ticket price.</span>
                  </li>
                  <li className="flex gap-3">
                    <CircleCheck className="w-5 h-5 text-accent shrink-0" />
                    <span>Use clear, high-quality images for your banner.</span>
                  </li>
                  <li className="flex gap-3">
                    <CircleCheck className="w-5 h-5 text-accent shrink-0" />
                    <span>Clearly state the refund policy to build trust.</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 rounded-3xl bg-primary/5 border border-dashed border-primary/20 text-center">
                <p className="text-xs text-muted-foreground">
                  Need help with your description? Contact our support team for listing optimization services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
