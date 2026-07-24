'use client';

import React from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <header className="space-y-4">
              <h1 className="text-5xl font-medium tracking-tight">Get in touch</h1>
              <p className="text-muted-foreground text-lg">Have a question about an order or our products? Our dispatch team is ready to help.</p>
            </header>

            <div className="space-y-8">
              <ContactLink icon={Phone} title="Call us" value="0722522346" href="tel:0722522346" />
              <ContactLink icon={Mail} title="Email support" value="Info@steakwestbutchery.co.ke" href="mailto:Info@steakwestbutchery.co.ke" />
              <ContactLink icon={Box} title="Mailing address" value="P. O Box 7144- 00200" />
              <ContactLink icon={MapPin} title="Main node" value="Nairobi West, Nairobi" />
              <ContactLink icon={MessageSquare} title="Live chat" value="Available 8am - 10pm daily" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[12px] font-bold text-muted-foreground ml-1">Full name</label>
                       <Input placeholder="John Doe" className="h-14 rounded-2xl bg-white border-none shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[12px] font-bold text-muted-foreground ml-1">Email address</label>
                       <Input type="email" placeholder="john@example.com" className="h-14 rounded-2xl bg-white border-none shadow-inner" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[12px] font-bold text-muted-foreground ml-1">Subject</label>
                     <Input placeholder="Order inquiry" className="h-14 rounded-2xl bg-white border-none shadow-inner" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[12px] font-bold text-muted-foreground ml-1">Message</label>
                     <Textarea placeholder="How can we help?" className="min-h-[150px] rounded-[2rem] bg-white border-none shadow-inner p-6" />
                  </div>
                  <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-base shadow-xl shadow-red-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                     Send message <Send className="w-5 h-5" />
                  </Button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactLink({ icon: Icon, title, value, href }: any) {
  const content = (
    <div className="flex items-center gap-6 group cursor-pointer">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
         <Icon className="w-6 h-6" />
      </div>
      <div>
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">{title}</p>
         <p className="text-lg font-medium">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}