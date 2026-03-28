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

export const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'The Royal Wedding Showcase',
    category: 'Wedding',
    date: '2024-06-15T10:00:00Z',
    location: 'Grand Manor Estate, London',
    price: 45,
    description: 'An exclusive viewing of our latest luxury wedding floral collections and grand ballroom transformations.',
    imageUrl: 'https://picsum.photos/seed/flowers1/1200/800',
    organizer: 'Lee Decors',
    ticketsTotal: 200,
    ticketsSold: 185,
    tags: ['Wedding', 'Luxury', 'Flowers', 'Inspiration']
  },
  {
    id: '2',
    title: 'Modern Corporate Gala Decor Expo',
    category: 'Corporate',
    date: '2024-08-20T18:00:00Z',
    location: 'Skyline Business Center, London',
    price: 0,
    description: 'Discover how we elevate corporate events with sophisticated floral designs and minimalist decor.',
    imageUrl: 'https://picsum.photos/seed/decor1/1200/800',
    organizer: 'Lee Decors',
    ticketsTotal: 500,
    ticketsSold: 310,
    tags: ['Corporate', 'Networking', 'Minimalism']
  },
  {
    id: '3',
    title: 'Peony & Rose Arrangement Workshop',
    category: 'Workshop',
    date: '2024-05-25T14:00:00Z',
    location: 'The Lee Studio, Chelsea',
    price: 120,
    description: 'A hands-on masterclass in creating the perfect centerpiece using seasonal peonies and garden roses.',
    imageUrl: 'https://picsum.photos/seed/flowers2/1200/800',
    organizer: 'Lee Decors',
    ticketsTotal: 15,
    ticketsSold: 12,
    tags: ['Learning', 'Floral Art', 'Summer']
  },
  {
    id: '4',
    title: 'Enchanted Forest Charity Ball',
    category: 'Gala',
    date: '2024-11-12T19:00:00Z',
    location: 'Victoria & Albert Museum',
    price: 250,
    description: 'Step into a world of magic featuring our signature immersive floral installations.',
    imageUrl: 'https://picsum.photos/seed/flowers3/1200/800',
    organizer: 'Lee Decors',
    ticketsTotal: 400,
    ticketsSold: 380,
    tags: ['Gala', 'Charity', 'Immersive']
  },
  {
    id: '5',
    title: 'Summer Garden Party Decor Suite',
    category: 'Private',
    date: '2024-07-04T12:00:00Z',
    location: 'Richmond Park Gardens',
    price: 0,
    description: 'Preview our outdoor collection featuring weather-resistant florals and elegant garden furniture.',
    imageUrl: 'https://picsum.photos/seed/flowers4/1200/800',
    organizer: 'Lee Decors',
    ticketsTotal: 1000,
    ticketsSold: 450,
    tags: ['Outdoor', 'Garden', 'Party']
  }
];