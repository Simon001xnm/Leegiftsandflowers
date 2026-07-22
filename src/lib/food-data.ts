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

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Steak West Butchery',
    category: 'Raw Meat',
    rating: 4.9,
    deliveryTime: '15-25 min',
    deliveryFee: 100,
    imageUrl: "/BEEF TAKEAWAY.jpg",
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
    imageUrl: "/BEEF CHOMA.jpg",
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
    imageUrl: "/FULL KICHWA YA GOAT.jpg",
    description: 'Authentic African sausage (Mutura) and Supu delicacies.',
    location: 'Pangani, Nairobi',
    isFeatured: true
  }
];

export const MOCK_MENU: MenuItem[] = [
  { id: 'p1', restaurantId: 'r1', name: 'BEEF CHEMSHA 1KG', price: 1400, description: 'Slow-boiled tender beef.', imageUrl: '/beef chemsha SMB.jpg', category: 'Cooked' },
  { id: 'p2', restaurantId: 'r1', name: 'BEEF CHOMA 1KG', price: 1400, description: 'Grilled beef cuts.', imageUrl: '/BEEF CHOMA.jpg', category: 'Nyama Choma', isPopular: true },
  { id: 'p3', restaurantId: 'r1', name: 'BEEF DRY FRY 1KG', price: 1400, description: 'Spiced dry-fried beef.', imageUrl: '/BEEF DRY FRY.jpg', category: 'Cooked' },
  { id: 'p4', restaurantId: 'r1', name: 'BEEF TAKEAWAY', price: 900, description: 'Fresh beef for takeaway.', imageUrl: '/BEEF TAKEAWAY.jpg', category: 'Raw Meat' },
  { id: 'p5', restaurantId: 'r1', name: 'CHIPS', price: 200, description: 'Crispy potato fries.', imageUrl: '/CHIPS.jpg', category: 'Sides' },
  { id: 'p7', restaurantId: 'r1', name: 'FULL CHICKEN', price: 700, description: 'Whole farm-fresh chicken.', imageUrl: '/FULL CHICKEN.jpg', category: 'Cooked' },
  { id: 'p8', restaurantId: 'r1', name: 'FULL CHICKEN CHOMA', price: 1000, description: 'Grilled whole chicken.', imageUrl: '/FULL CHICKEN CHOMA.jpg', category: 'Nyama Choma' },
  { id: 'p9', restaurantId: 'r1', name: 'FULL KICHWA GOAT', price: 800, description: 'Traditional goat head delicacy.', imageUrl: '/FULL KICHWA YA GOAT.jpg', category: 'Delicacies' },
  { id: 'p10', restaurantId: 'r1', name: 'FULL MGUU COW BOILED', price: 400, description: 'Traditional boiled cow leg.', imageUrl: '/MGUU COW.jpg', category: 'Delicacies' },
  { id: 'p11', restaurantId: 'r1', name: 'FULL ULIMI COW', price: 1400, description: 'Boiled cow tongue delicacy.', imageUrl: '/MGUU COW.jpg', category: 'Delicacies' },
  { id: 'p12', restaurantId: 'r1', name: 'GOAT CHEMSHA 1KG', price: 1400, description: 'Boiled tender goat meat.', imageUrl: '/beef chemsha SMB.jpg', category: 'Cooked' },
  { id: 'p13', restaurantId: 'r1', name: 'GOAT CHOMA 1KG', price: 1350, description: 'Flame-grilled goat meat.', imageUrl: '/BEEF CHOMA.jpg', category: 'Nyama Choma', isPopular: true },
  { id: 'p14', restaurantId: 'r1', name: 'GOAT DYFRY 1KG', price: 1400, description: 'Spiced dry-fried goat.', imageUrl: '/BEEF DRY FRY.jpg', category: 'Cooked' },
  { id: 'p16', restaurantId: 'r1', name: 'GOAT TAKEAWAY 1KG', price: 1100, description: 'Fresh goat meat for takeaway.', imageUrl: '/BEEF TAKEAWAY.jpg', category: 'Raw Meat' },
  { id: 'p20', restaurantId: 'r1', name: 'LIVER 1KG TAKE AWAY', price: 1100, description: 'Fresh liver for takeaway.', imageUrl: '/BEEF TAKEAWAY.jpg', category: 'Raw Meat' },
  { id: 'p24', restaurantId: 'r1', name: 'MUTURA', price: 100, description: 'Authentic Nairobi sausage.', imageUrl: '/BEEF CHOMA.jpg', category: 'Delicacies', isPopular: true }
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
