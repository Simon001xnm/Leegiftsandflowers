export type FoodCategory = 'Raw Meat' | 'Nyama Choma' | 'Delicacies' | 'Cooked' | 'Sides' | 'Drinks' | 'Grocery' | 'Essentials';
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
  isFeatured?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  isPopular?: boolean;
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
  steak: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=800&h=600&auto=format&fit=crop",
  mbuzi: "https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=800&h=600&auto=format&fit=crop",
  kichwa: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&h=600&auto=format&fit=crop",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&h=600&auto=format&fit=crop"
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
    location: 'Westlands, Nairobi',
    isFeatured: true
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
    location: 'Koinange St, Nairobi',
    isFeatured: true
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
    location: 'Pangani, Nairobi',
    isFeatured: true
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
  },
  {
    id: 'r5',
    name: 'Prime Cuts Lavington',
    category: 'Raw Meat',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 100,
    imageUrl: MEAT_IMAGES.steak,
    description: 'Specializing in aged beef and premium cuts for the discerning kitchen.',
    location: 'Lavington, Nairobi'
  },
  {
    id: 'r6',
    name: 'Eastleigh Supu Center',
    category: 'Delicacies',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 90,
    imageUrl: MEAT_IMAGES.kichwa,
    description: 'Nairobi\'s most famous Supu ya Kichwa and boiled head delicacies.',
    location: 'Eastleigh, Nairobi'
  },
  {
    id: 'r7',
    name: 'Green Grocers & Meat',
    category: 'Grocery',
    rating: 4.4,
    deliveryTime: '20-35 min',
    deliveryFee: 150,
    imageUrl: MEAT_IMAGES.grocery,
    description: 'Fresh vegetables and pantry essentials alongside premium meat.',
    location: 'Parklands, Nairobi'
  }
];

export const MOCK_MENU: MenuItem[] = [
  // RAW MEAT (Steak West)
  { id: 'p1', restaurantId: 'r1', name: 'Premium Beef Steak (1kg)', price: 950, description: 'Aged beef steak, perfectly marbled.', imageUrl: MEAT_IMAGES.steak, category: 'Raw Meat', isPopular: true },
  { id: 'p2', restaurantId: 'r1', name: 'Goat Meat / Mbuzi (1kg)', price: 1100, description: 'Fresh, tender goat meat for stews.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat', isPopular: true },
  { id: 'p3', restaurantId: 'r1', name: 'Pork Chops (1kg)', price: 850, description: 'Succulent farm-fresh pork chops.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  { id: 'p4', restaurantId: 'r1', name: 'Beef Mince (500g)', price: 480, description: 'Lean ground beef for pasta and burgers.', imageUrl: MEAT_IMAGES.steak, category: 'Raw Meat' },
  { id: 'p5', restaurantId: 'r1', name: 'Lamb Leg (1kg)', price: 1400, description: 'Premium lamb leg, ideal for roasting.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  { id: 'p6', restaurantId: 'r1', name: 'Chicken Breast (500g)', price: 650, description: 'Skinless, boneless chicken breast.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  
  // NYAMA CHOMA (City Market)
  { id: 'p7', restaurantId: 'r2', name: 'Mbuzi Choma (Full Leg)', price: 2800, description: 'Slow-roasted whole goat leg.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma', isPopular: true },
  { id: 'p8', restaurantId: 'r2', name: 'Beef Choma (1kg)', price: 1500, description: 'Grilled to order with kachumbari.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma', isPopular: true },
  { id: 'p9', restaurantId: 'r2', name: 'Pork Spare Ribs', price: 1200, description: 'Honey-glazed grilled pork ribs.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },
  { id: 'p10', restaurantId: 'r2', name: 'Choma Sausage (4pcs)', price: 400, description: 'Grilled beef sausages.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },
  { id: 'p11', restaurantId: 'r2', name: 'Platter for 4', price: 4500, description: 'Mixed beef, goat, and chicken with sides.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },

  // DELICACIES (The Mutura Hub)
  { id: 'p12', restaurantId: 'r3', name: 'Special Mutura (Large)', price: 300, description: 'Famous Nairobi traditional sausage.', imageUrl: MEAT_IMAGES.mutura, category: 'Delicacies', isPopular: true },
  { id: 'p13', restaurantId: 'r3', name: 'Supu ya Kichwa', price: 250, description: 'Nutritious traditional head soup.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies', isPopular: true },
  { id: 'p14', restaurantId: 'r3', name: 'Kichwa ya Ng\'ombe (Boiled)', price: 1200, description: 'Soft cow head delicacy.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p15', restaurantId: 'r3', name: 'Tumbukiza (Mbuzi)', price: 900, description: 'Boiled goat meat with greens.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p16', restaurantId: 'r3', name: 'Fried Matumbo', price: 500, description: 'Spiced tripe fry.', imageUrl: MEAT_IMAGES.matumbo, category: 'Delicacies' },
  
  // COOKED (Matumbo Master)
  { id: 'p17', restaurantId: 'r4', name: 'Matumbo Stew & Ugali', price: 550, description: 'Home-style tripe stew with ugali.', imageUrl: MEAT_IMAGES.matumbo, category: 'Cooked', isPopular: true },
  { id: 'p18', restaurantId: 'r4', name: 'Beef Stew & Rice', price: 600, description: 'Hearty beef stew served with basmati rice.', imageUrl: MEAT_IMAGES.matumbo, category: 'Cooked' },
  { id: 'p19', restaurantId: 'r4', name: 'Wet Fry Matumbo', price: 450, description: 'Spicy wet-fried tripe.', imageUrl: MEAT_IMAGES.matumbo, category: 'Cooked' },
  { id: 'p20', restaurantId: 'r4', name: 'Liver Fry', price: 700, description: 'Fresh beef liver sautéed with onions.', imageUrl: MEAT_IMAGES.matumbo, category: 'Cooked' },
  
  // GROCERY & SIDES (Marketplace Feel)
  { id: 'p21', restaurantId: 'r7', name: 'Ugali Flour (2kg)', price: 210, description: 'Premium maize meal.', imageUrl: MEAT_IMAGES.grocery, category: 'Grocery' },
  { id: 'p22', restaurantId: 'r7', name: 'Cooking Oil (1L)', price: 350, description: 'Pure vegetable oil.', imageUrl: MEAT_IMAGES.grocery, category: 'Grocery' },
  { id: 'p23', restaurantId: 'r7', name: 'Nairobi Kachumbari Kit', price: 150, description: 'Onions, tomatoes, and dhania.', imageUrl: MEAT_IMAGES.grocery, category: 'Grocery' },
  { id: 'p24', restaurantId: 'r7', name: 'Managu (Large Bunch)', price: 100, description: 'Fresh indigenous greens.', imageUrl: MEAT_IMAGES.grocery, category: 'Grocery' },
  { id: 'p25', restaurantId: 'r7', name: 'Royco Mchuzi Mix', price: 50, description: 'Essential meat seasoning.', imageUrl: MEAT_IMAGES.grocery, category: 'Grocery' },
  
  // DRINKS
  { id: 'p26', restaurantId: 'r2', name: 'Coke (500ml)', price: 100, description: 'Chilled soda.', imageUrl: MEAT_IMAGES.grocery, category: 'Drinks' },
  { id: 'p27', restaurantId: 'r2', name: 'Mineral Water (500ml)', price: 60, description: 'Refreshing pure water.', imageUrl: MEAT_IMAGES.grocery, category: 'Drinks' },
  { id: 'p28', restaurantId: 'r2', name: 'Fresh Juice (Passion)', price: 200, description: '100% natural passion fruit juice.', imageUrl: MEAT_IMAGES.grocery, category: 'Drinks' },
  
  // ADDITIONAL MARKETPLACE PRODUCTS
  { id: 'p29', restaurantId: 'r5', name: 'Rib-Eye Steak (500g)', price: 1200, description: 'High-end aged rib-eye.', imageUrl: MEAT_IMAGES.steak, category: 'Raw Meat' },
  { id: 'p30', restaurantId: 'r5', name: 'Beef Sausages (1kg)', price: 750, description: 'Premium breakfast sausages.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  { id: 'p31', restaurantId: 'r6', name: 'Kichwa Stew Special', price: 1100, description: 'Famous spicy head stew.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p32', restaurantId: 'r6', name: 'Bone Soup (Bowl)', price: 200, description: 'Rich beef bone broth.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p33', restaurantId: 'r1', name: 'Ox-Tail (1kg)', price: 900, description: 'Fresh ox-tail for slow cooking.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  { id: 'p34', restaurantId: 'r1', name: 'Kidney (500g)', price: 400, description: 'Fresh beef kidney.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' }
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
