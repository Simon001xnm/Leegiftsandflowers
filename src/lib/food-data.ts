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
  items: any[];
  total: number;
  status: OrderStatus;
  date: string;
  deliveryAddress: string;
  hour?: number; 
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
  }
];

export const MOCK_MENU: MenuItem[] = [
  { id: 'p1', restaurantId: 'r1', name: 'BEEF CHEMSHA 1KG', price: 1400, description: 'Slow-boiled tender beef.', imageUrl: '/beef chemsha SMB.jpg', category: 'Cooked' },
  { id: 'p2', restaurantId: 'r1', name: 'BEEF CHOMA 1KG', price: 1400, description: 'Grilled beef cuts.', imageUrl: '/BEEF CHOMA.jpg', category: 'Nyama Choma', isPopular: true },
  { id: 'p3', restaurantId: 'r1', name: 'BEEF DRY FRY 1KG', price: 1400, description: 'Spiced dry-fried beef.', imageUrl: '/BEEF DRY FRY.jpg', category: 'Cooked' },
  { id: 'p4', restaurantId: 'r1', name: 'BEEF TAKEAWAY', price: 900, description: 'Fresh beef for takeaway.', imageUrl: '/BEEF TAKEAWAY.jpg', category: 'Raw Meat' },
  { id: 'p5', restaurantId: 'r1', name: 'CHIPS', price: 200, description: 'Crispy potato fries.', imageUrl: '/CHIPS.jpg', category: 'Sides' },
  { id: 'p8', restaurantId: 'r1', name: 'FULL CHICKEN CHOMA', price: 1000, description: 'Grilled whole chicken.', imageUrl: '/FULL CHICKEN CHOMA.jpg', category: 'Nyama Choma' },
  { id: 'p7', restaurantId: 'r1', name: 'FULL CHICKEN', price: 700, description: 'Whole farm-fresh chicken.', imageUrl: '/FULL CHICKEN.jpg', category: 'Cooked' },
  { id: 'p9', restaurantId: 'r1', name: 'FULL KICHWA GOAT', price: 800, description: 'Traditional goat head delicacy.', imageUrl: '/FULL KICHWA YA GOAT.jpg', category: 'Delicacies' },
  { id: 'p10', restaurantId: 'r1', name: 'FULL MGUU COW BOILED', price: 400, description: 'Traditional boiled cow leg.', imageUrl: '/MGUU COW.jpg', category: 'Delicacies' },
  { id: 'p13', restaurantId: 'r1', name: 'GOAT CHOMA 1KG', price: 1350, description: 'Flame-grilled goat meat.', imageUrl: '/BEEF CHOMA.jpg', category: 'Nyama Choma', isPopular: true },
  { id: 'p24', restaurantId: 'r1', name: 'MUTURA', price: 100, description: 'Authentic Nairobi sausage.', imageUrl: '/BEEF CHOMA.jpg', category: 'Delicacies', isPopular: true }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-01', customerName: 'Alex', restaurantName: 'Steak West', items: ['Beef Choma'], total: 1400, status: 'Delivered', date: '2024-05-20', deliveryAddress: 'Kilimani', hour: 10 },
  { id: 'ORD-02', customerName: 'John', restaurantName: 'Steak West', items: ['Mutura'], total: 500, status: 'Delivered', date: '2024-05-20', deliveryAddress: 'Westlands', hour: 11 },
  { id: 'ORD-03', customerName: 'Sara', restaurantName: 'Steak West', items: ['Beef Chemsha'], total: 1400, status: 'Delivered', date: '2024-05-20', deliveryAddress: 'Lavington', hour: 11 },
  { id: 'ORD-04', customerName: 'Jane', restaurantName: 'Steak West', items: ['Chicken'], total: 700, status: 'Delivered', date: '2024-05-20', deliveryAddress: 'Kileleshwa', hour: 14 },
  { id: 'ORD-05', customerName: 'Mike', restaurantName: 'Steak West', items: ['Mguu Cow'], total: 400, status: 'Delivered', date: '2024-05-20', deliveryAddress: 'CBD', hour: 15 },
];
