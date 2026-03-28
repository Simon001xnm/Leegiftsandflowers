"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS } from "@/lib/events-data";
import { ShoppingCart, Filter, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function FlowerShopPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Bouquets", "Signature", "Baskets"];

  const filteredProducts = filter === "All" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-12">
          <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-none px-4 py-1">
            <Sparkles className="w-3 h-3 mr-2" />
            Fresh Daily Deliveries
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold font-headline text-primary mb-4">The Flower Shop</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Bring the elegance of Lee Decors into your home. Browse our curated selection of artisanal arrangements, hand-crafted by our master florists.
          </p>
        </header>

        <div className="flex items-center justify-between mb-8 border-b pb-6">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                className="rounded-full px-6"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <Button variant="ghost" className="gap-2 text-muted-foreground hidden md:flex">
            <Filter className="w-4 h-4" /> Filter By
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-primary backdrop-blur-sm shadow-sm">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold font-headline text-primary mb-2">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">£{product.price}</span>
                  <span className="text-xs text-muted-foreground">/ arrangement</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full rounded-full gap-2 bg-primary hover:bg-primary/90">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No arrangements found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
