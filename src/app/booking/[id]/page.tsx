
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// Redirect existing booking links to the new checkout system for food delivery
export default function RedirectToCheckout() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      router.replace(`/checkout/${params.id}`);
    } else {
      router.replace("/restaurants");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary font-bold">Redirecting to checkout...</div>
    </div>
  );
}
