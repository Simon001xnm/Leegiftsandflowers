
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";

export function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds for testing/engagement
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("steak_west_popup_seen");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("steak_west_popup_seen", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none rounded-[2.5rem] bg-white gap-0">
        <button 
          onClick={handleClose}
          className="absolute right-6 top-6 z-10 p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center pt-10 pb-6 px-8 text-center">
          {/* Illustration Container */}
          <div className="w-32 h-32 rounded-full bg-[#FFF9E6] flex items-center justify-center mb-6 relative">
            <div className="w-20 h-24 bg-[#00A36C] rounded-xl relative shadow-lg transform -rotate-3 flex items-center justify-center">
              <span className="text-white font-black text-3xl">W</span>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-[#00A36C] rounded-full border-b-transparent" />
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-sm font-medium text-muted-foreground">Steak West Prime membership</p>
            <h2 className="text-2xl font-bold font-headline text-primary leading-tight">
              Steak West Prime free for 4 weeks
            </h2>
            <p className="text-sm text-muted-foreground">For a limited-time only</p>
          </div>

          {/* Dashed Separator */}
          <div className="w-full border-t-2 border-dashed border-muted mb-8" />

          <Button 
            className="w-full h-14 rounded-2xl bg-[#9E6E00] hover:bg-[#855D00] text-white text-lg font-bold shadow-lg shadow-primary/10 transition-all active:scale-95"
            onClick={handleClose}
          >
            Try for free
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
