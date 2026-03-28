import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_EVENTS, MOCK_PRODUCTS } from "@/lib/events-data";
import { Calendar, MapPin, ArrowRight, Sparkles, LayoutDashboard, Flower2, Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredEvents = MOCK_EVENTS.slice(0, 3);
  const featuredFlowers = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-36 bg-secondary/20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 py-1 px-4 text-primary font-semibold flex items-center gap-2 w-fit bg-white/50 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                Bespoke Floral & Decor Artistry in Nairobi
              </Badge>
              <h1 className="text-6xl lg:text-8xl font-bold text-primary mb-8 leading-tight font-headline">
                Exquisite Beauty, <br />
                <span className="text-accent italic">Perfectly Arranged.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-xl leading-relaxed">
                From grand venue transformations to artisanal hand-tied bouquets, Lee Decors and Flowers brings floral elegance to Stall 16A, City Market.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/shop">
                  <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Shop Flowers
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full bg-white border-2 hover:bg-muted transition-all">
                    Event Portfolios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-10 pointer-events-none">
             <div className="w-full h-full bg-gradient-to-l from-accent/50 to-transparent flex items-center justify-center">
                <Flower2 className="w-96 h-96 text-accent" />
             </div>
          </div>
        </section>

        {/* Shop Flowers Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold font-headline text-primary mb-3">Our Boutique Shop</h2>
                <p className="text-muted-foreground text-lg">Signature arrangements available for delivery. Each bouquet is a unique masterpiece from our City Market studio.</p>
              </div>
              <Link href="/shop">
                <Button variant="outline" className="rounded-full gap-2 border-primary/20 hover:border-primary">
                  Browse Full Shop <ShoppingBag className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredFlowers.map((product) => (
                <Link key={product.id} href="/shop" className="group">
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-primary mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-primary/70 font-bold">KES {product.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-4xl font-bold font-headline text-primary mb-3">Exhibition Galleries</h2>
                <p className="text-muted-foreground text-lg">Experience the artistry of Lee Decors at our upcoming events in Nairobi.</p>
              </div>
              <Link href="/events" className="text-accent font-bold flex items-center gap-2 group hover:underline">
                View all portfolios
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredEvents.map((event) => (
                <Link 
                  key={event.id} 
                  href={`/events/${event.id}`}
                  className="group flex flex-col bg-card rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={event.imageUrl} 
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <Badge className="absolute top-6 left-6 shadow-sm bg-white/95 text-primary hover:bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 font-headline line-clamp-1 group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-accent" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent" />
                        {event.location.split(',')[0]}
                      </div>
                    </div>
                    <div className="mt-auto pt-6 border-t flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {event.price === 0 ? 'Free Entry' : `From KES ${event.price.toLocaleString()}`}
                      </span>
                      <Button variant="ghost" size="sm" className="rounded-full group-hover:bg-accent group-hover:text-white transition-all">
                        Details
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-28 bg-primary text-primary-foreground overflow-hidden rounded-[3rem] mx-4 lg:mx-8 mb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-5xl font-bold font-headline mb-6">The Lee Experience</h2>
              <p className="text-primary-foreground/70 text-xl leading-relaxed">Located at Stall 16A, City Market, we believe every space has a story to tell. Our mission is to narrate that story through the timeless elegance of flowers.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="space-y-6 text-center group">
                <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-white mx-auto transform group-hover:rotate-12 transition-transform">
                  <Flower2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-headline">Bespoke Florals</h3>
                <p className="text-primary-foreground/60 leading-relaxed text-lg">
                  Hand-selected, seasonal blooms curated specifically for your aesthetic preferences and event mood.
                </p>
              </div>
              <div className="space-y-6 text-center group">
                <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-white mx-auto transform group-hover:-rotate-12 transition-transform">
                  <LayoutDashboard className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-headline">Venue Styling</h3>
                <p className="text-primary-foreground/60 leading-relaxed text-lg">
                  Complete environmental design, from luxury linens to statement lighting and custom furniture.
                </p>
              </div>
              <div className="space-y-6 text-center group">
                <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center text-white mx-auto transform group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-headline">Personal Touch</h3>
                <p className="text-primary-foreground/60 leading-relaxed text-lg">
                  Dedicated design consultations to ensure every petal and candle reflects your personal style.
                </p>
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
                  <Flower2 className="w-6 h-6" />
                </div>
                <span className="font-headline text-2xl font-bold tracking-tight text-primary">
                  Lee Decors
                </span>
              </Link>
              <p className="text-muted-foreground text-sm">Stall 16A, City Market, Nairobi</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-primary/70">
              <Link href="/shop" className="hover:text-accent transition-colors uppercase tracking-widest">Flower Shop</Link>
              <Link href="/events" className="hover:text-accent transition-colors uppercase tracking-widest">Our Work</Link>
              <Link href="/dashboard" className="hover:text-accent transition-colors uppercase tracking-widest">Client Portal</Link>
              <Link href="#" className="hover:text-accent transition-colors uppercase tracking-widest">Contact</Link>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              © 2024 Lee Decors and Flowers. Nairobi, Kenya.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
