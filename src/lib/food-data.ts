export type FoodCategory = 'Burger' | 'Pizza' | 'Sushi' | 'Coffee' | 'Healthy' | 'Dessert' | 'Local' | 'Chinese' | 'Indian';
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

const FOOD_IMAGES = {
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&h=400&auto=format&fit=crop",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&h=400&auto=format&fit=crop",
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&h=400&auto=format&fit=crop",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&h=400&auto=format&fit=crop",
  healthy: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&h=400&auto=format&fit=crop",
  dessert: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&h=400&auto=format&fit=crop",
  local: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=600&h=400&auto=format&fit=crop",
  chinese: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&h=400&auto=format&fit=crop",
  indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&h=400&auto=format&fit=crop",
  drinks: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=600&h=400&auto=format&fit=crop"
};

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger Haven',
    category: 'Burger',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 150,
    imageUrl: FOOD_IMAGES.burger,
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
    imageUrl: FOOD_IMAGES.pizza,
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
    imageUrl: FOOD_IMAGES.sushi,
    description: 'Freshly prepared sushi and sashimi by master chefs.',
    location: 'Lavington, Nairobi'
  },
  {
    id: 'r4',
    name: 'Nairobi Nyama Choma',
    category: 'Local',
    rating: 4.7,
    deliveryTime: '35-50 min',
    deliveryFee: 100,
    imageUrl: FOOD_IMAGES.local,
    description: 'The best authentic Kenyan grilled meat and sides.',
    location: 'Nairobi Central, Nairobi'
  },
  {
    id: 'r5',
    name: 'Golden Wok',
    category: 'Chinese',
    rating: 4.5,
    deliveryTime: '25-40 min',
    deliveryFee: 180,
    imageUrl: FOOD_IMAGES.chinese,
    description: 'Classic Chinese stir-fry and dim sum specialties.',
    location: 'Parklands, Nairobi'
  },
  {
    id: 'r6',
    name: 'Spice Route',
    category: 'Indian',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 220,
    imageUrl: FOOD_IMAGES.indian,
    description: 'Flavorful Indian curries, tandoori, and fresh naans.',
    location: 'Karen, Nairobi'
  },
  {
    id: 'r7',
    name: 'Green Leaf Cafe',
    category: 'Healthy',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 120,
    imageUrl: FOOD_IMAGES.healthy,
    description: 'Fresh salads, grain bowls, and cold-pressed juices.',
    location: 'Hurlingham, Nairobi'
  },
  {
    id: 'r8',
    name: 'Sweet Tooth Bakery',
    category: 'Dessert',
    rating: 4.9,
    deliveryTime: '20-35 min',
    deliveryFee: 150,
    imageUrl: FOOD_IMAGES.dessert,
    description: 'Artisanal cakes, pastries, and decadent desserts.',
    location: 'Gigiri, Nairobi'
  },
  {
    id: 'r9',
    name: 'Java Jive',
    category: 'Coffee',
    rating: 4.4,
    deliveryTime: '10-20 min',
    deliveryFee: 80,
    imageUrl: FOOD_IMAGES.coffee,
    description: 'Premium Kenyan coffee and quick breakfast snacks.',
    location: 'CBD, Nairobi'
  }
];

export const MOCK_MENU: MenuItem[] = [
  // Burger Haven
  { id: 'm1', restaurantId: 'r1', name: 'Classic Cheeseburger', price: 850, description: 'Beef patty, cheddar, lettuce, tomato, and secret sauce.', imageUrl: FOOD_IMAGES.burger, category: 'Mains' },
  { id: 'm2', restaurantId: 'r1', name: 'BBQ Bacon Burger', price: 1100, description: 'Smoky BBQ sauce, crispy bacon, and onion rings.', imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  { id: 'm3', restaurantId: 'r1', name: 'Truffle Fries', price: 450, description: 'Hand-cut fries tossed in truffle oil and parmesan.', imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&h=400&auto=format&fit=crop", category: 'Sides' },
  { id: 'm101', restaurantId: 'r1', name: 'Craft Soda', price: 250, description: 'Artisanal soda made with real cane sugar.', imageUrl: FOOD_IMAGES.drinks, category: 'Drinks' },
  { id: 'm102', restaurantId: 'r1', name: 'Iced Tea', price: 200, description: 'House-made peach and lemon iced tea.', imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&h=400&auto=format&fit=crop", category: 'Drinks' },
  
  // Pizza Pros
  { id: 'm4', restaurantId: 'r2', name: 'Margherita', price: 950, description: 'Fresh mozzarella, basil, and San Marzano tomatoes.', imageUrl: FOOD_IMAGES.pizza, category: 'Mains' },
  { id: 'm5', restaurantId: 'r2', name: 'Pepperoni Feast', price: 1200, description: 'Loaded with spicy pepperoni and extra cheese.', imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  { id: 'm103', restaurantId: 'r2', name: 'Lemonade', price: 300, description: 'Freshly squeezed lemons with a hint of mint.', imageUrl: FOOD_IMAGES.drinks, category: 'Drinks' },
  
  // Sushi Zen
  { id: 'm6', restaurantId: 'r3', name: 'Salmon Nigiri Set', price: 2100, description: '8 pieces of fresh salmon on seasoned rice.', imageUrl: FOOD_IMAGES.sushi, category: 'Mains' },
  { id: 'm7', restaurantId: 'r3', name: 'Dragon Roll', price: 1800, description: 'Tempura shrimp, avocado, and unagi sauce.', imageUrl: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  { id: 'm104', restaurantId: 'r3', name: 'Green Tea', price: 150, description: 'Premium Japanese matcha green tea.', imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=600&h=400&auto=format&fit=crop", category: 'Drinks' },

  // Nairobi Nyama Choma
  { id: 'm8', restaurantId: 'r4', name: 'Grilled Goat (1kg)', price: 1800, description: 'Slow-grilled tender goat meat served with kachumbari.', imageUrl: FOOD_IMAGES.local, category: 'Mains' },
  { id: 'm9', restaurantId: 'r4', name: 'Ugali & Sukuma', price: 350, description: 'Traditional Kenyan cornmeal cake with sautéed greens.', imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=600&h=400&auto=format&fit=crop", category: 'Sides' },
  { id: 'm105', restaurantId: 'r4', name: 'Tusker Cider', price: 400, description: 'Chilled local apple cider.', imageUrl: FOOD_IMAGES.drinks, category: 'Drinks' }
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
