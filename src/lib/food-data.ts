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
  }
];

export const MOCK_MENU: MenuItem[] = [
  // List 1
  { id: 'p1', restaurantId: 'r1', name: 'BEEF CHEMSHA 1KG', price: 1400, description: 'Slow-boiled tender beef.', imageUrl: MEAT_IMAGES.supu, category: 'Cooked' },
  { id: 'p2', restaurantId: 'r1', name: 'BEEF CHOMA 1KG', price: 1400, description: 'Grilled beef cuts.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma', isPopular: true },
  { id: 'p3', restaurantId: 'r1', name: 'BEEF DRY FRY 1KG', price: 1400, description: 'Spiced dry-fried beef.', imageUrl: MEAT_IMAGES.choma, category: 'Cooked' },
  { id: 'p4', restaurantId: 'r1', name: 'BEEF TAKEAWAY', price: 900, description: 'Fresh beef for takeaway.', imageUrl: MEAT_IMAGES.steak, category: 'Raw Meat' },
  { id: 'p5', restaurantId: 'r1', name: 'CHIPS', price: 200, description: 'Crispy potato fries.', imageUrl: MEAT_IMAGES.grocery, category: 'Sides' },
  { id: 'p6', restaurantId: 'r1', name: 'COOKING SERVCE CHARGE', price: 250, description: 'Professional cooking service.', imageUrl: MEAT_IMAGES.choma, category: 'Essentials' },
  { id: 'p7', restaurantId: 'r1', name: 'FULL CHICKEN', price: 700, description: 'Whole farm-fresh chicken.', imageUrl: MEAT_IMAGES.raw, category: 'Cooked' },
  { id: 'p8', restaurantId: 'r1', name: 'FULL CHICKEN CHOMA', price: 1000, description: 'Grilled whole chicken.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },
  { id: 'p9', restaurantId: 'r1', name: 'FULL KICHWA GOAT', price: 800, description: 'Traditional goat head delicacy.', imageUrl: MEAT_IMAGES.kichwa, category: 'Delicacies' },
  { id: 'p10', restaurantId: 'r1', name: 'FULL MGUU COW BOILED', price: 400, description: 'Traditional boiled cow leg.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p11', restaurantId: 'r1', name: 'FULL ULIMI COW', price: 1400, description: 'Boiled cow tongue delicacy.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p12', restaurantId: 'r1', name: 'GOAT CHEMSHA 1KG', price: 1400, description: 'Boiled tender goat meat.', imageUrl: MEAT_IMAGES.supu, category: 'Cooked' },
  { id: 'p13', restaurantId: 'r1', name: 'GOAT CHOMA 1KG', price: 1350, description: 'Flame-grilled goat meat.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma', isPopular: true },
  { id: 'p14', restaurantId: 'r1', name: 'GOAT DYFRY 1KG', price: 1400, description: 'Spiced dry-fried goat.', imageUrl: MEAT_IMAGES.choma, category: 'Cooked' },
  { id: 'p15', restaurantId: 'r1', name: 'GOAT FRY 1KG', price: 1400, description: 'Classic fried goat meat.', imageUrl: MEAT_IMAGES.choma, category: 'Cooked' },
  
  // List 2
  { id: 'p16', restaurantId: 'r1', name: 'GOAT TAKEAWAY 1KG', price: 1100, description: 'Fresh goat meat for takeaway.', imageUrl: MEAT_IMAGES.mbuzi, category: 'Raw Meat' },
  { id: 'p17', restaurantId: 'r1', name: 'GREENS KIENYEJI', price: 150, description: 'Traditional Kenyan greens.', imageUrl: MEAT_IMAGES.grocery, category: 'Sides' },
  { id: 'p18', restaurantId: 'r1', name: 'LIVER 1KG CHOMA', price: 1400, description: 'Expertly grilled liver.', imageUrl: MEAT_IMAGES.choma, category: 'Nyama Choma' },
  { id: 'p19', restaurantId: 'r1', name: 'LIVER 1KG DRY FRY', price: 1400, description: 'Savory dry-fried liver.', imageUrl: MEAT_IMAGES.choma, category: 'Cooked' },
  { id: 'p20', restaurantId: 'r1', name: 'LIVER 1KG TAKE AWAY', price: 1100, description: 'Fresh liver for takeaway.', imageUrl: MEAT_IMAGES.raw, category: 'Raw Meat' },
  { id: 'p21', restaurantId: 'r1', name: 'LIVER 1KG WET FRY', price: 1400, description: 'Delicious wet-fried liver.', imageUrl: MEAT_IMAGES.choma, category: 'Cooked' },
  { id: 'p22', restaurantId: 'r1', name: 'MGUU GOAT', price: 50, description: 'Individual goat leg piece.', imageUrl: MEAT_IMAGES.mutura, category: 'Delicacies' },
  { id: 'p23', restaurantId: 'r1', name: 'MUKIMO', price: 150, description: 'Traditional mashed delicacy.', imageUrl: MEAT_IMAGES.grocery, category: 'Sides' },
  { id: 'p24', restaurantId: 'r1', name: 'MUTURA', price: 100, description: 'Authentic Nairobi sausage.', imageUrl: MEAT_IMAGES.mutura, category: 'Delicacies', isPopular: true },
  { id: 'p25', restaurantId: 'r1', name: 'SOUP', price: 50, description: 'Rich, flavorful bone broth.', imageUrl: MEAT_IMAGES.supu, category: 'Delicacies' },
  { id: 'p26', restaurantId: 'r1', name: 'SPINACH', price: 50, description: 'Freshly sautéed spinach.', imageUrl: MEAT_IMAGES.grocery, category: 'Sides' },
  { id: 'p27', restaurantId: 'r1', name: 'UGALI', price: 50, description: 'A Kenyan staple side dish.', imageUrl: MEAT_IMAGES.grocery, category: 'Sides' }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-WEST-001',
    customerName: 'Alex Johnson',
    restaurantName: 'Steak West Butchery',
    items: ['BEEF CHOMA 1KG', 'CHIPS'],
    total: 1600,
    status: 'Delivered',
    date: '2024-05-15',
    deliveryAddress: 'Riverside Dr, Nairobi'
  }
];