
export type EventCategory = 'Music' | 'Tech' | 'Workshop' | 'Art' | 'Food' | 'Business';

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

export const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Neon Pulse: Summer Solstice Concert',
    category: 'Music',
    date: '2024-06-21T20:00:00Z',
    location: 'Skyline Amphitheater, Los Angeles',
    price: 85,
    description: 'Experience a night of electrifying synth-pop and mesmerizing light shows under the summer stars.',
    imageUrl: 'https://picsum.photos/seed/concert1/1200/800',
    organizer: 'Momentus Prime',
    ticketsTotal: 1500,
    ticketsSold: 1240,
    tags: ['Music', 'Live', 'Summer', 'Outdoor']
  },
  {
    id: '2',
    title: 'Future Tech Summit 2024',
    category: 'Tech',
    date: '2024-08-15T09:00:00Z',
    location: 'Innovation Center, San Francisco',
    price: 299,
    description: 'The premier gathering for AI researchers, blockchain developers, and tech visionaries.',
    imageUrl: 'https://picsum.photos/seed/tech1/1200/800',
    organizer: 'TechVanguard',
    ticketsTotal: 500,
    ticketsSold: 310,
    tags: ['Technology', 'AI', 'Networking']
  },
  {
    id: '3',
    title: 'Mindful Potter: Ceramic Workshop',
    category: 'Workshop',
    date: '2024-05-12T14:00:00Z',
    location: 'The Artisan Collective, Brooklyn',
    price: 45,
    description: 'Learn the ancient art of pottery in this hands-on, meditative session for beginners.',
    imageUrl: 'https://picsum.photos/seed/workshop1/1200/800',
    organizer: 'Artisan Hub',
    ticketsTotal: 25,
    ticketsSold: 18,
    tags: ['Art', 'Workshop', 'Handmade']
  },
  {
    id: '4',
    title: 'Ethereal Visions: Digital Art Expo',
    category: 'Art',
    date: '2024-07-01T11:00:00Z',
    location: 'Modern Muse Gallery, Seattle',
    price: 15,
    description: 'Exploring the boundaries between the physical and digital through immersive art installations.',
    imageUrl: 'https://picsum.photos/seed/art1/1200/800',
    organizer: 'Momentus Arts',
    ticketsTotal: 300,
    ticketsSold: 85,
    tags: ['Art', 'Digital', 'Immersive']
  },
  {
    id: '5',
    title: 'Gourmet Street Food Carnival',
    category: 'Food',
    date: '2024-09-10T12:00:00Z',
    location: 'Central Park Plaza, Austin',
    price: 0,
    description: 'A culinary journey featuring the city\'s best food trucks, local breweries, and live jazz.',
    imageUrl: 'https://picsum.photos/seed/food1/1200/800',
    organizer: 'Austin Eats',
    ticketsTotal: 5000,
    ticketsSold: 2100,
    tags: ['Food', 'Free', 'Family', 'Outdoor']
  }
];
