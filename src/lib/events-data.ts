
export type EventCategory = 'Wedding' | 'Corporate' | 'Workshop' | 'Art' | 'Gala' | 'Private';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  organizer: string;
  ticketsTotal: number;
  ticketsSold: number;
  tags: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const REAL_IMAGES = [
  "/WhatsApp Image 2026-04-07 at 11.35.12 AM.jpeg",
  "/WhatsApp Image 2026-04-07 at 11.40.39 AM.jpeg",
  "/WhatsApp Image 2026-04-07 at 11.45.36 AM.jpeg",
  "/WhatsApp Image 2026-04-07 at 12.44.38 PM.jpeg",
  "/WhatsApp Image 2026-04-07 at 12.48.05 PM.jpeg",
  "/WhatsApp Image 2026-04-07 at 12.52.42 PM.jpeg",
  "/WhatsApp Image 2026-04-07 at 12.56.38 PM.jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.27 AM (1).jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.27 AM.jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.29 AM (1).jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.29 AM (2).jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.29 AM.jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.30 AM (1).jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.30 AM (2).jpeg",
  "/WhatsApp Image 2026-04-08 at 11.55.30 AM.jpeg"
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'The Royal Wedding Showcase',
    category: 'Wedding',
    date: '2024-06-15T10:00:00Z',
    location: 'Stall 16A, City Market, Koinange Street, Nairobi',
    price: 4500,
    description: 'An exclusive viewing of our latest luxury wedding floral collections and grand ballroom transformations in the heart of Nairobi.',
    imageUrl: REAL_IMAGES[0],
    organizer: 'Lee Decors',
    ticketsTotal: 200,
    ticketsSold: 185,
    tags: ['Wedding', 'Luxury', 'Flowers', 'Nairobi']
  },
  {
    id: '2',
    title: 'Modern Corporate Gala Decor Expo',
    category: 'Corporate',
    date: '2024-08-20T18:00:00Z',
    location: 'KICC, Nairobi Central',
    price: 0,
    description: 'Discover how we elevate corporate events with sophisticated floral designs and minimalist decor.',
    imageUrl: REAL_IMAGES[1],
    organizer: 'Lee Decors',
    ticketsTotal: 500,
    ticketsSold: 310,
    tags: ['Corporate', 'Networking', 'Nairobi']
  },
  {
    id: '3',
    title: 'Tropical Arrangement Workshop',
    category: 'Workshop',
    date: '2024-05-25T14:00:00Z',
    location: 'Stall 16A, City Market, Koinange Street, Nairobi',
    price: 3500,
    description: 'A hands-on masterclass in our Nairobi studio creating the perfect centerpiece using seasonal tropical blooms.',
    imageUrl: REAL_IMAGES[2],
    organizer: 'Lee Decors',
    ticketsTotal: 15,
    ticketsSold: 12,
    tags: ['Learning', 'Floral Art', 'Workshop']
  },
  {
    id: '4',
    title: 'Enchanted Forest Charity Ball',
    category: 'Gala',
    date: '2024-11-12T19:00:00Z',
    location: 'Villa Rosa Kempinski, Nairobi',
    price: 15000,
    description: 'Step into a world of magic featuring our signature immersive floral installations.',
    imageUrl: REAL_IMAGES[3],
    organizer: 'Lee Decors',
    ticketsTotal: 400,
    ticketsSold: 380,
    tags: ['Gala', 'Charity', 'Immersive']
  },
  {
    id: '5',
    title: 'Nairobi Garden Party Expo',
    category: 'Private',
    date: '2024-07-04T12:00:00Z',
    location: 'Karura Forest, Nairobi',
    price: 0,
    description: 'Preview our outdoor collection featuring weather-resistant florals and elegant garden furniture.',
    imageUrl: REAL_IMAGES[4],
    organizer: 'Lee Decors',
    ticketsTotal: 1000,
    ticketsSold: 450,
    tags: ['Outdoor', 'Garden', 'Party']
  }
];

const productNames = [
  "Blushing Romance", "Savannah Elegance", "City Market Fresh", "Nairobi Bloom", 
  "Koinange Special", "Market Day Surprise", "Royal Orchid Mix", "Sunset Safari",
  "Highland Lilies", "Rift Valley Roses", "Stall 16A Signature", "Tropical Bliss",
  "Elegant Ivory", "Crimson Passion", "Velvet Petals", "Morning Dew",
  "Golden Sunbeam", "Midnight Mystery", "Azure Dreams", "Lavender Whisper",
  "Peppermint Fresh", "Summer Solstice", "Autumn Hearth", "Winter Frost",
  "Spring Awakening", "Garden Party Mix", "Corporate Chic", "Bridal Glow",
  "Classic Charm", "Modern Muse", "Rustic Roots", "Urban Jungle",
  "Wildwood Wander", "Ocean Breeze", "Desert Rose", "Starlight Sparkle",
  "Joyful Spirit", "Peaceful Haven", "Graceful Beauty", "Endless Love"
];

const categories = ["Bouquets", "Signature", "Baskets", "Luxury"];

export const MOCK_PRODUCTS: ProductItem[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `p${i + 1}`,
  name: productNames[i % productNames.length],
  price: 1500 + (Math.floor(Math.random() * 20) * 500),
  description: `A beautiful hand-crafted arrangement from Lee Decors Stall 16A, featuring the freshest seasonal blooms available in Nairobi.`,
  imageUrl: REAL_IMAGES[i % REAL_IMAGES.length],
  category: categories[i % categories.length]
}));

export const MOCK_GALLERY: GalleryItem[] = REAL_IMAGES.map((img, i) => ({
  id: `g${i + 1}`,
  title: i === 0 ? 'Our Market Stall' : `Signature Work ${i}`,
  description: i === 0 ? 'Stall 16A at the iconic City Market, Nairobi.' : 'Exquisite floral artistry from Lee Decors.',
  imageUrl: img
}));
