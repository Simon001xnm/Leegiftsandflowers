export type FoodCategory = 'Raw Meat' | 'Nyama Choma' | 'Delicacies' | 'Cooked' | 'Sides' | 'Drinks';
export type OrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Restaurant {
  id: string;
  name: string;
  category: FoodCategory;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  description: string;
  location: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  items: string[];
  total: number;
  status: OrderStatus;
  date: string;
  deliveryAddress: string;
}

const MEAT_IMAGES = {
  choma: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=800&h=600&auto=format&fit=crop",
  raw: "https://images.unsplash.com/photo-1544022613-e879a7998d2f?q=80&w=800&h=600&auto=format&fit=crop",
  mutura: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=800&h=600&auto=format&fit=crop",
  supu: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&h=600&auto=format&fit=crop",
  matumbo: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800&h=600&auto=format&fit=crop",
  steak: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=800&h=600&auto=format&fit=crop"
};

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Steak West Butchery',
    category: 'Raw Meat',
    rating: 4.9,
    deliveryTime: '15-25 min',
    deliveryFee: 100,
    imageUrl: MEAT_IMAGES.raw,
    description: 'Nairobi\'s finest selection of premium beef, goat, and pork. Fresh from the farm.',
    location: 'Westlands, Nairobi'
  },
  {
    id: 'r2',
    name: 'City Market Choma Grill',
    category: 'Nyama Choma',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 150,
    imageUrl: MEAT_IMAGES.choma,
    description: 'Expertly grilled Nyama Choma, served hot with legendary kachumbari.',
    location: 'Koinange St, Nairobi'
  },
  {
    id: 'r3',
    name: 'The Mutura Hub',
    category: 'Delicacies',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 80,
    imageUrl: MEAT_IMAGES.mutura,
    description: 'Authentic African sausage (Mutura) and Supu delicacies.',
    location: 'Pangani, Nairobi'
  },
  {
    id: 'r4',
    name: 'Matumbo Master',
    category: 'Cooked',
    rating: 4.6,
    deliveryTime: '25-40 min',
    deliveryFee: 120,
    imageUrl: MEAT_IMAGES.matumbo,
    description: 'The best Matumbo fry and stew in town, just like home.',
    location: 'Kilimani, Nairobi'
  }
];

export const MOCK_MENU: MenuItem[] = [
  // Steak West Butchery (Raw)
  { id: 'm1', restaurantId: 'r1', name: 'Premium Beef Steak (1kg)', price: 950, description: 'Fresh, lean beef steak ideal for grilling or pan-frying.', imageUrl: MEAT_IMAGES.steak, category: 'Raw Meat' },
  { id: 'm2', restaurantId: 'r1', name: 'Goat Meat / Mbuzi (1kg)', price: 1100, description: 'Tender goat meat, perfect for stews or roasting.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  { id: 'm3', restaurantId: 'r1', name: 'Pork Chops (1kg)', price: 850, description: 'Succulent farm-fresh pork chops.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },

  // City Market Choma Grill (Cooked)
  { id: 'm4', restaurantId: 'r2', name: 'Mbuzi Choma (Full)', price: 2800, description: 'Whole goat leg, slow-roasted to perfection.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },
  { id: 'm5', restaurantId: 'r2', name: 'Beef Choma (1kg)', price: 1500, description: 'Traditional Kenyan grilled beef.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },
  { id: 'm6', restaurantId: 'r2', name: 'Kachumbari Special', price: 150, description: 'Fresh onion, tomato, and chili salad.', imageUrl: MEAT_IMAGES.choma, category: 'Sides' },

  // The Mutura Hub (Delicacies)
  { id: 'm7', restaurantId: 'r3', name: 'Authentic Mutura', price: 200, description: 'Traditional Kenyan sausage, spicy and rich.', imageUrl: MEAT_IMAGES.mutura, category: 'Delicacies' },
  { id: 'm8', restaurantId: 'r3', name: 'Supu ya Kichwa', price: 300, description: 'Traditional head soup, highly nutritious and tasty.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'm9', restaurantId: 'r3', name: 'Kichwa ya Ng\'ombe (Boiled)', price: 1200, description: 'Soft, well-seasoned cow head meat.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },

  // Matumbo Master
  { id: 'm10', restaurantId: 'r4', name: 'Matumbo Fry', price: 450, description: 'Deep-fried tripe with onions and spices.', imageUrl: MEAT_IMAGES.matumbo, category: 'Cooked' },
  { id: 'm11', restaurantId: 'r4', name: 'Ugali Portion', price: 100, description: 'Classic white cornmeal cake.', imageUrl: MEAT_IMAGES.choma, category: 'Sides' }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-WEST-001',
    customerName: 'Alex Johnson',
    restaurantName: 'Steak West Butchery',
    items: ['Beef Steak (1kg)', 'Mutura'],
    total: 1150,
    status: 'Delivered',
    date: '2024-05-15',
    deliveryAddress: 'Riverside Dr, Nairobi'
  },
  {
    id: 'ORD-WEST-002',
    customerName: 'Jane Doe',
    restaurantName: 'The Mutura Hub',
    items: ['Supu ya Kichwa', 'Mutura'],
    total: 500,
    status: 'Out for Delivery',
    date: '2024-05-16',
    deliveryAddress: 'Kileleshwa, Nairobi'
  }
];
