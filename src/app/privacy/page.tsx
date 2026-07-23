
'use client';

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-5xl font-medium tracking-tight">Privacy policy</h1>
          <p className="text-muted-foreground">Last updated: May 2026</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">1. Information we collect</h2>
          <p className="text-gray-600 leading-relaxed">We collect information you provide directly to us when you create an account, place an order, or contact support. This includes your name, email address, delivery address, and phone number.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">2. How we use your data</h2>
          <p className="text-gray-600 leading-relaxed">Your information is primarily used to process and deliver your orders. We also use your data to improve our services, communicate offers (if opted-in), and ensure the security of your transactions.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">3. Data security</h2>
          <p className="text-gray-600 leading-relaxed">We implement industry-standard security measures to protect your personal information. Your payment details are processed through secure, encrypted payment gateways and are never stored directly on our servers.</p>
        </section>
      </div>
    </div>
  );
}
