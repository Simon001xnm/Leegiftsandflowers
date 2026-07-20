import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Search, MapPin, Star, Clock, ArrowRight, Utensils, Bike, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Home() {
  const popularRestaurants = MOCK_RESTAURANTS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 py-1 px-4 text-primary font-semibold bg-white/50 backdrop-blur-sm">
                Delicious food delivered to your door
              </Badge>
              <h1 className="text-6xl lg:text-7xl font-bold text-primary mb-8 leading-tight font-headline">
                Hungry? <br />
                <span className="text-accent italic">We've got you covered.</span>
              </h1>
              
              <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-xl border border-primary/10">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input 
                    placeholder="Enter your delivery address" 
                    className="h-14 pl-12 border-none focus-visible:ring-0 text-lg"
                  />
                </div>
                <Button className="h-14 px-8 rounded-xl text-lg font-bold">
                  Find Food
                </Button>
              </div>

              <div className="mt-8 flex gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Bike className="w-5 h-5 text-primary" /> Free delivery over KES 2000
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" /> Best prices in Nairobi
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block pointer-events-none opacity-20">
             <div className="w-full h-full bg-gradient-to-l from-primary/20 to-transparent flex items-center justify-center">
                <Utensils className="w-96 h-96 text-primary rotate-12" />
             </div>
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold font-headline text-primary mb-2">Popular Restaurants</h2>
                <p className="text-muted-foreground text-lg">The most ordered from spots in your area.</p>
              </div>
              <Link href="/restaurants" className="text-primary font-bold flex items-center gap-2 group hover:underline">
                View all restaurants
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularRestaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-card rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-primary font-bold border-none">
                      {restaurant.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold font-headline text-primary group-hover:text-primary/80 transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg text-primary font-bold text-sm">
                        <Star className="w-4 h-4 fill-primary" /> {restaurant.rating}
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Wallet className="w-4 h-4" /> KES {restaurant.deliveryFee} fee
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* App Features */}
        <section className="py-20 bg-secondary/20 rounded-[3rem] mx-4 lg:mx-8 mb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-primary/20">
                  <Bike className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary">Lightning Fast</h3>
                <p className="text-muted-foreground">Average delivery time is under 30 minutes. Hot food, guaranteed.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-accent/20">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary">Top Rated</h3>
                <p className="text-muted-foreground">We only partner with the best-rated restaurants in the city.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-primary/20">
                  <Wallet className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary">Best Value</h3>
                <p className="text-muted-foreground">No hidden fees. Earn rewards with every order you place.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="font-headline text-2xl font-bold tracking-tight text-primary">
                  Lee Eats
                </span>
              </Link>
              <p className="text-muted-foreground text-sm">Deliciously Delivered across Nairobi.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-primary/70">
              <Link href="/restaurants" className="hover:text-primary transition-colors uppercase tracking-widest">Browse Restaurants</Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors uppercase tracking-widest">Partner with us</Link>
              <Link href="/help" className="hover:text-primary transition-colors uppercase tracking-widest">Help Center</Link>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              © 2024 Lee Eats. Nairobi, Kenya.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}