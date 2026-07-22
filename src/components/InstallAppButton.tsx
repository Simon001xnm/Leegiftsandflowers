
"use client";

import { useState, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * A direct download/install button for the Steak West Software.
 * It only appears when the system is ready to install.
 */
export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent browser's default bar and store the event
      e.preventDefault();
      setDeferredPrompt(e);
      setIsReady(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Hide button if already installed as software
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsReady(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    
    // Directly trigger the system's software installation dialog
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsReady(false);
      setDeferredPrompt(null);
      toast({
        title: "Success",
        description: "Steak West is now installed as software on your desktop.",
      });
    }
    setIsInstalling(false);
  };

  // Only show the button when the computer confirms it can be downloaded as software
  if (!isReady) return null;

  return (
    <Button 
      onClick={handleInstall}
      disabled={isInstalling}
      className="flex items-center gap-3 bg-primary text-white border-none hover:bg-primary/90 rounded-full font-black text-xs uppercase tracking-widest h-12 px-8 transition-all shadow-2xl animate-pulse"
    >
      {isInstalling ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {isInstalling ? "Downloading..." : "Install Software"}
    </Button>
  );
}
