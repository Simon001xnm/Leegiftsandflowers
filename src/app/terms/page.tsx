
'use client';

import React from "react";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-5xl font-medium tracking-tight">Terms of service</h1>
          <p className="text-muted-foreground">Last updated: May 2026</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">1. Delivery promise</h2>
          <p className="text-gray-600 leading-relaxed">Steak West strives for a 25-minute delivery window. However, factors such as extreme weather or traffic may impact this. In cases of significant delays, our dispatch team will reach out to you directly.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">2. Order cancellations</h2>
          <p className="text-gray-600 leading-relaxed">Orders can only be cancelled within 2 minutes of placement. Once the preparation process at our node has begun, cancellations are no longer possible due to the fresh nature of our products.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">3. Product quality</h2>
          <p className="text-gray-600 leading-relaxed">If you are not satisfied with the quality of the product delivered, please contact our support team within 1 hour of receipt with photos of the item for a resolution.</p>
        </section>
      </div>
    </div>
  );
}
