
"use client";

import { useState, useEffect } from "react";
import { Download, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Installation Note",
        description: "To install on this device, use your browser's 'Add to Home Screen' or 'Install' menu option.",
      });
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsVisible(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <Button 
      onClick={handleInstall}
      variant="outline" 
      size="sm" 
      className="hidden md:flex items-center gap-2 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-4 transition-all animate-pulse"
    >
      <Download className="w-3.5 h-3.5" />
      Download App
    </Button>
  );
}
