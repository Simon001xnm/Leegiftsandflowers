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
  indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&h=400&auto=format&fit=crop"
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
  },
  {
    id: 'r10',
    name: 'Mambo Pizza',
    category: 'Pizza',
    rating: 4.3,
    deliveryTime: '25-40 min',
    deliveryFee: 150,
    imageUrl: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Budget-friendly delicious pizzas for the whole family.',
    location: 'South C, Nairobi'
  },
  {
    id: 'r11',
    name: 'Bombay Bites',
    category: 'Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 200,
    imageUrl: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Authentic Indian street food and traditional meals.',
    location: 'Ngong Rd, Nairobi'
  },
  {
    id: 'r12',
    name: 'Wok Stars',
    category: 'Chinese',
    rating: 4.6,
    deliveryTime: '20-30 min',
    deliveryFee: 160,
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Fast, fresh, and fiery Chinese take-out favorites.',
    location: 'Kileleshwa, Nairobi'
  },
  {
    id: 'r13',
    name: 'Urban Taps',
    category: 'Burger',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryFee: 140,
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Craft burgers and unique sides in the heart of the city.',
    location: 'Central, Nairobi'
  },
  {
    id: 'r14',
    name: 'Kuku Choma Spot',
    category: 'Local',
    rating: 4.5,
    deliveryTime: '30-45 min',
    deliveryFee: 100,
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'The best charcoal grilled chicken in Nairobi.',
    location: 'Embakasi, Nairobi'
  },
  {
    id: 'r15',
    name: 'Pasta & Beyond',
    category: 'Healthy',
    rating: 4.4,
    deliveryTime: '35-50 min',
    deliveryFee: 180,
    imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Authentic Italian pasta made fresh daily.',
    location: 'Ridgeways, Nairobi'
  },
  {
    id: 'r16',
    name: 'Berry Bliss',
    category: 'Dessert',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: 120,
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Healthy desserts and frozen yogurt treats.',
    location: 'Muthaiga, Nairobi'
  },
  {
    id: 'r17',
    name: 'Waffle House',
    category: 'Dessert',
    rating: 4.6,
    deliveryTime: '20-30 min',
    deliveryFee: 150,
    imageUrl: "https://images.unsplash.com/photo-1573335012937-db414bee01d4?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Belgian waffles with all your favorite toppings.',
    location: 'Westlands, Nairobi'
  },
  {
    id: 'r18',
    name: 'Thai Orchid',
    category: 'Chinese',
    rating: 4.7,
    deliveryTime: '30-45 min',
    deliveryFee: 200,
    imageUrl: "https://images.unsplash.com/photo-1559311648-d46f4d8593d8?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Exotic Thai flavors and spicy traditional dishes.',
    location: 'Lavington, Nairobi'
  },
  {
    id: 'r19',
    name: 'Brew Master',
    category: 'Coffee',
    rating: 4.5,
    deliveryTime: '10-20 min',
    deliveryFee: 90,
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&h=400&auto=format&fit=crop",
    description: 'Specialty coffee roasting and delicious pastries.',
    location: 'Kilimani, Nairobi'
  }
];

export const MOCK_MENU: MenuItem[] = [
  // Burger Haven
  { id: 'm1', restaurantId: 'r1', name: 'Classic Cheeseburger', price: 850, description: 'Beef patty, cheddar, lettuce, tomato, and secret sauce.', imageUrl: FOOD_IMAGES.burger, category: 'Mains' },
  { id: 'm2', restaurantId: 'r1', name: 'BBQ Bacon Burger', price: 1100, description: 'Smoky BBQ sauce, crispy bacon, and onion rings.', imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  { id: 'm3', restaurantId: 'r1', name: 'Truffle Fries', price: 450, description: 'Hand-cut fries tossed in truffle oil and parmesan.', imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&h=400&auto=format&fit=crop", category: 'Sides' },
  
  // Pizza Pros
  { id: 'm4', restaurantId: 'r2', name: 'Margherita', price: 950, description: 'Fresh mozzarella, basil, and San Marzano tomatoes.', imageUrl: FOOD_IMAGES.pizza, category: 'Mains' },
  { id: 'm5', restaurantId: 'r2', name: 'Pepperoni Feast', price: 1200, description: 'Loaded with spicy pepperoni and extra cheese.', imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  
  // Sushi Zen
  { id: 'm6', restaurantId: 'r3', name: 'Salmon Nigiri Set', price: 2100, description: '8 pieces of fresh salmon on seasoned rice.', imageUrl: FOOD_IMAGES.sushi, category: 'Mains' },
  { id: 'm7', restaurantId: 'r3', name: 'Dragon Roll', price: 1800, description: 'Tempura shrimp, avocado, and unagi sauce.', imageUrl: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },

  // Nairobi Nyama Choma
  { id: 'm8', restaurantId: 'r4', name: 'Grilled Goat (1kg)', price: 1800, description: 'Slow-grilled tender goat meat served with kachumbari.', imageUrl: FOOD_IMAGES.local, category: 'Mains' },
  { id: 'm9', restaurantId: 'r4', name: 'Ugali & Sukuma', price: 350, description: 'Traditional Kenyan cornmeal cake with sautéed greens.', imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=600&h=400&auto=format&fit=crop", category: 'Sides' },

  // Golden Wok
  { id: 'm10', restaurantId: 'r5', name: 'Kung Pao Chicken', price: 950, description: 'Spicy stir-fry with chicken, peanuts, and vegetables.', imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  { id: 'm11', restaurantId: 'r5', name: 'Veggie Spring Rolls', price: 400, description: 'Crispy rolls stuffed with fresh garden vegetables.', imageUrl: "https://images.unsplash.com/photo-1606330942701-05391e607421?q=80&w=600&h=400&auto=format&fit=crop", category: 'Sides' },

  // Spice Route
  { id: 'm12', restaurantId: 'r6', name: 'Butter Chicken', price: 1250, description: 'Creamy tomato-based curry with tender chicken pieces.', imageUrl: "https://images.unsplash.com/photo-1603894527134-f286392070e1?q=80&w=600&h=400&auto=format&fit=crop", category: 'Mains' },
  { id: 'm13', restaurantId: 'r6', name: 'Garlic Naan', price: 150, description: 'Soft tandoori bread flavored with fresh garlic.', imageUrl: "https://images.unsplash.com/photo-1533777324545-e016935322b2?q=80&w=600&h=400&auto=format&fit=crop", category: 'Sides' },

  // Green Leaf Cafe
  { id: 'm14', restaurantId: 'r7', name: 'Quinoa Power Bowl', price: 850, description: 'Quinoa, kale, avocado, chickpeas, and lemon tahini.', imageUrl: FOOD_IMAGES.healthy, category: 'Mains' },

  // Sweet Tooth Bakery
  { id: 'm15', restaurantId: 'r8', name: 'Red Velvet Slice', price: 450, description: 'Rich red velvet cake with cream cheese frosting.', imageUrl: FOOD_IMAGES.dessert, category: 'Dessert' }
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
  },
  {
    id: 'ORD-104',
    customerName: 'Alex Johnson',
    restaurantName: 'Spice Route',
    items: ['Butter Chicken', 'Garlic Naan'],
    total: 1400,
    status: 'Pending',
    date: '2024-05-12',
    deliveryAddress: 'State House Rd, Nairobi'
  }
];
