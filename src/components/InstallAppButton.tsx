
"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the browser's default install prompt automatically
      e.preventDefault();
      // Stash the event so we can trigger it with our button
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // If the app is already installed, hide the button
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    } else {
      // Show button by default on desktops to encourage download
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback message only if the browser hasn't fired the event yet
      toast({
        title: "Preparing Download...",
        description: "Please wait a moment while we prepare the software, or check for the 'Install' icon in your browser address bar.",
      });
      return;
    }

    // Trigger the actual system installation dialog
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User installed Steak West as software");
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  if (!isVisible) return null;

  return (
    <Button 
      onClick={handleInstall}
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2 bg-primary text-white border-none hover:bg-primary/90 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-4 transition-all shadow-lg animate-pulse"
    >
      <Download className="w-3.5 h-3.5" />
      Download App
    </Button>
  );
}
