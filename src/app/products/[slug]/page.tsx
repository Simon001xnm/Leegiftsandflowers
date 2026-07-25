
'use client';

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

/**
 * REDIRECTOR NODE
 * This page is being merged into [id] to resolve Next.js naming conflicts.
 */
export default function ProductSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  useEffect(() => {
    // Forward the dynamic request to the unified [id] handler
    router.replace(`/products/${slug}`);
  }, [slug, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <RefreshCw className="w-8 h-8 animate-spin text-primary opacity-20" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Redirecting to Node...</p>
    </div>
  );
}
