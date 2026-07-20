export type FoodCategory = 'Burger' | 'Pizza' | 'Sushi' | 'Coffee' | 'Healthy' | 'Dessert';
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

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&h=400&auto=format&fit=crop"
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger Haven',
    category: 'Burger',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 150,
    imageUrl: FOOD_IMAGES[0],
    description: 'The juiciest burgers in Nairobi, made with 100% grass-fed beef.',
    location: 'Westlands, Nairobi'
  },
  {
    id: 'r2',
    name: 'Pizza Pros',
    category: 'Pizza',
    rating: 4.6,
    deliveryTime: '30-45 min',
    deliveryFee: 200,
    imageUrl: FOOD_IMAGES[1],
    description: 'Authentic wood-fired pizzas with premium local toppings.',
    location: 'Kilimani, Nairobi'
  },
  {
    id: 'r3',
    name: 'Sushi Zen',
    category: 'Sushi',
    rating: 4.9,
    deliveryTime: '40-55 min',
    deliveryFee: 300,
    imageUrl: FOOD_IMAGES[2],
    description: 'Freshly prepared sushi and sashimi by master chefs.',
    location: 'Lavington, Nairobi'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-101',
    customerName: 'Alex Johnson',
    restaurantName: 'Burger Haven',
    items: ['Double Cheese Burger', 'Fries'],
    total: 1250,
    status: 'Delivered',
    date: '2024-05-10',
    deliveryAddress: 'State House Rd, Nairobi'
  },
  {
    id: 'ORD-102',
    customerName: 'Alex Johnson',
    restaurantName: 'Pizza Pros',
    items: ['Large Margherita', 'Coke 2L'],
    total: 1800,
    status: 'Out for Delivery',
    date: '2024-05-11',
    deliveryAddress: 'State House Rd, Nairobi'
  },
  {
    id: 'ORD-103',
    customerName: 'Jane Smith',
    restaurantName: 'Sushi Zen',
    items: ['Salmon Nigiri Set'],
    total: 2100,
    status: 'Preparing',
    date: '2024-05-11',
    deliveryAddress: 'Gigiri, Nairobi'
  }
];

export const MOCK_MENU: MenuItem[] = [
  {
    id: 'm1',
    restaurantId: 'r1',
    name: 'Classic Cheeseburger',
    price: 850,
    description: 'Beef patty, cheddar, lettuce, tomato, and our secret sauce.',
    imageUrl: FOOD_IMAGES[0],
    category: 'Mains'
  }
];
