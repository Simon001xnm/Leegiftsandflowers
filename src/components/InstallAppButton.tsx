
"use client";

import { useState, useEffect } from "react";
import { Download, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the browser's default install prompt
      e.preventDefault();
      // Stash the event so we can trigger it with our button
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Show button if not already in standalone mode
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback: If the automated prompt hasn't fired, we guide them to the direct system install
      toast({
        title: "Software Installation",
        description: "To install Steak West as software, please click the 'Install' icon in your browser's address bar or use the 'Add to Home Screen' option.",
      });
      return;
    }

    // Trigger the actual system installation dialog immediately
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsVisible(false);
      setDeferredPrompt(null);
      toast({
        title: "Installation Started",
        description: "Steak West is being added to your desktop as a standalone application.",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <Button 
      onClick={handleInstall}
      className="flex items-center gap-2 bg-primary text-white border-none hover:bg-primary/90 rounded-full font-black text-[10px] uppercase tracking-widest h-10 px-6 transition-all shadow-xl animate-pulse"
    >
      <Download className="w-4 h-4" />
      Download Software
    </Button>
  );
}
