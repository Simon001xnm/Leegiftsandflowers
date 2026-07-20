export type FoodCategory = 'Burger' | 'Pizza' | 'Sushi' | 'Coffee' | 'Healthy' | 'Dessert';

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
  },
  {
    id: 'r4',
    name: 'Brew & Beans',
    category: 'Coffee',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 100,
    imageUrl: FOOD_IMAGES[3],
    description: 'Artisanal coffee and fresh pastries delivered to your door.',
    location: 'CBD, Nairobi'
  },
  {
    id: 'r5',
    name: 'Green Leaf',
    category: 'Healthy',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 180,
    imageUrl: FOOD_IMAGES[4],
    description: 'Fresh salads, grain bowls, and cold-pressed juices.',
    location: 'Gigiri, Nairobi'
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
  },
  {
    id: 'm2',
    restaurantId: 'r2',
    name: 'Margherita Pizza',
    price: 1200,
    description: 'San Marzano tomatoes, fresh mozzarella, basil, and olive oil.',
    imageUrl: FOOD_IMAGES[1],
    category: 'Pizza'
  },
  {
    id: 'm3',
    restaurantId: 'r3',
    name: 'Salmon Nigiri Set',
    price: 1800,
    description: '8 pieces of fresh salmon nigiri with wasabi and ginger.',
    imageUrl: FOOD_IMAGES[2],
    category: 'Sushi'
  }
];