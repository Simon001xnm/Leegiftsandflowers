
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Search, MapPin, Star, Clock, ArrowRight, Utensils, Bike, Wallet, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const popularRestaurants = MOCK_RESTAURANTS.slice(0, 9);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-rider');

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20 lg:py-32">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-white font-semibold bg-primary/90 backdrop-blur-sm border-none">
                Fastest Delivery in Nairobi
              </Badge>
              <h1 className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight font-headline">
                Hungry? <br />
                <span className="text-accent italic">We've got you covered.</span>
              </h1>
              
              <div className="bg-white p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-700">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input 
                    placeholder="Enter your delivery address" 
                    className="h-14 pl-12 border-none focus-visible:ring-0 text-lg"
                  />
                </div>
                <Button className="h-14 px-10 rounded-xl text-lg font-bold shadow-lg shadow-primary/30">
                  Find Food <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-sm font-bold text-white/90">
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  <Bike className="w-5 h-5 text-accent" /> 30 Min Delivery
                </div>
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  <Wallet className="w-5 h-5 text-accent" /> Best Prices
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">Popular Restaurants</h2>
                <p className="text-muted-foreground text-lg">From local favorites to global brands, we bring the best of Nairobi directly to your doorstep.</p>
              </div>
              <Link href="/restaurants" className="text-primary font-bold flex items-center gap-2 group hover:translate-x-1 transition-transform">
                Browse all spots
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {popularRestaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-card rounded-[2.5rem] overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Badge className="absolute top-6 left-6 bg-white/95 text-primary font-bold border-none shadow-lg px-4 py-1.5">
                      {restaurant.category}
                    </Badge>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-xl text-accent font-bold text-sm">
                        <Star className="w-4 h-4 fill-accent" /> {restaurant.rating}
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Bike className="w-4 h-4 text-primary" /> KES {restaurant.deliveryFee} fee
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-secondary/20 rounded-[4rem] mx-4 lg:mx-8 mb-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-6">Why Lee Eats?</h2>
              <p className="text-muted-foreground text-lg italic">"Connecting Nairobi's best kitchens to your dining table with speed and care."</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
                  <Bike className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Lightning Fast</h3>
                  <p className="text-muted-foreground leading-relaxed">Average delivery time is under 30 minutes. Hot food, guaranteed from kitchen to door.</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-accent/20 -rotate-3 group-hover:rotate-0 transition-transform">
                  <Star className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Top Rated</h3>
                  <p className="text-muted-foreground leading-relaxed">We curate our partners. Only the best-rated restaurants in the city make it onto Lee Eats.</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-6 group-hover:rotate-0 transition-transform">
                  <Wallet className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Best Value</h3>
                  <p className="text-muted-foreground leading-relaxed">No hidden fees, no surge pricing. Earn exclusive rewards with every meal you order.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xl">
                  <Utensils className="w-7 h-7" />
                </div>
                <span className="font-headline text-3xl font-bold tracking-tight text-white">
                  Lee Eats
                </span>
              </Link>
              <p className="text-primary-foreground/70 text-lg max-w-sm">
                Nairobi's favorite food delivery app. Fresh, fast, and always delicious.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-xl mb-6 text-accent">Quick Links</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/restaurants" className="hover:text-accent transition-colors font-medium">Browse All Spots</Link>
                <Link href="/dashboard" className="hover:text-accent transition-colors font-medium">Become a Partner</Link>
                <Link href="/dashboard/rider" className="hover:text-accent transition-colors font-medium">Join the Rider Crew</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-xl mb-6 text-accent">Support</h4>
              <nav className="flex flex-col gap-4">
                <Link href="#" className="hover:text-accent transition-colors font-medium">Help Center</Link>
                <Link href="#" className="hover:text-accent transition-colors font-medium">Contact Us</Link>
                <Link href="#" className="hover:text-accent transition-colors font-medium">Privacy Policy</Link>
              </nav>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-primary-foreground/50">
            <p>© 2024 Lee Eats. Proudly serving Nairobi, Kenya.</p>
            <div className="flex gap-10">
              <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
              <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
              <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
