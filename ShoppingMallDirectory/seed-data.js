// Sample data to populate the shopping mall directory
import { db } from './server/db';
import { stores, events, news, comingSoonStores } from './shared/schema';

async function seedData() {
  console.log('Seeding sample data...');
  
  // Sample stores
  const sampleStores = [
    {
      name: "Apple Store",
      category: "Electronics",
      subcategory: "Technology",
      floor: "Ground Floor",
      unit: "G01",
      hours: "10:00 AM - 9:00 PM",
      description: "Premium technology products including iPhone, iPad, Mac, and accessories.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 1234",
      website: "https://apple.com",
      isOpen: true
    },
    {
      name: "Zara",
      category: "Fashion & Apparel",
      subcategory: "Women's Fashion",
      floor: "First Floor",
      unit: "F12",
      hours: "10:00 AM - 9:00 PM",
      description: "Latest fashion trends for women, men, and children.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 2345",
      website: "https://zara.com",
      isOpen: true
    },
    {
      name: "Sephora",
      category: "Beauty & Cosmetics",
      subcategory: "Cosmetics",
      floor: "Ground Floor",
      unit: "G15",
      hours: "10:00 AM - 9:00 PM",
      description: "Premium beauty products and cosmetics from top brands.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 3456",
      website: "https://sephora.com",
      isOpen: true
    },
    {
      name: "Nike",
      category: "Sports & Recreation",
      subcategory: "Athletic Wear",
      floor: "First Floor",
      unit: "F08",
      hours: "10:00 AM - 9:00 PM",
      description: "Athletic footwear, apparel, and equipment for all sports.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 4567",
      website: "https://nike.com",
      isOpen: true
    },
    {
      name: "H&M",
      category: "Fashion & Apparel",
      subcategory: "Fast Fashion",
      floor: "First Floor",
      unit: "F20",
      hours: "10:00 AM - 9:00 PM",
      description: "Affordable fashion for the whole family.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 5678",
      isOpen: true
    },
    {
      name: "Uniqlo",
      category: "Fashion & Apparel",
      subcategory: "Casual Wear",
      floor: "Ground Floor",
      unit: "G25",
      hours: "10:00 AM - 9:00 PM",
      description: "High-quality basics and innovative clothing technology.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 6789",
      website: "https://uniqlo.com",
      isOpen: true
    },
    {
      name: "David Jones",
      category: "Fashion & Apparel",
      subcategory: "Department Store",
      floor: "Second Floor",
      unit: "S01",
      hours: "10:00 AM - 9:00 PM",
      description: "Premium department store with luxury brands.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 7890",
      website: "https://davidjones.com",
      isOpen: true
    },
    {
      name: "JB Hi-Fi",
      category: "Electronics",
      subcategory: "Entertainment",
      floor: "Ground Floor",
      unit: "G30",
      hours: "10:00 AM - 9:00 PM",
      description: "Home entertainment, technology, and gaming products.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      phone: "(02) 9876 8901",
      website: "https://jbhifi.com.au",
      isOpen: true
    }
  ];

  // Sample events
  const sampleEvents = [
    {
      title: "Spring Fashion Week",
      description: "Discover the latest spring trends with exclusive fashion shows and designer previews.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-09-07'),
      type: "Fashion Event",
      location: "Centre Court",
      participatingStores: ["Zara", "H&M", "David Jones"],
      isActive: true
    },
    {
      title: "Tech Innovation Expo",
      description: "Experience the future of technology with hands-on demos and expert talks.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      startDate: new Date('2024-08-15'),
      endDate: new Date('2024-08-20'),
      type: "Featured Event",
      location: "Level 2 Event Space",
      participatingStores: ["Apple Store", "JB Hi-Fi"],
      isActive: true
    },
    {
      title: "Kids Summer Festival",
      description: "Fun activities, entertainment, and special offers for families.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-12-31'),
      type: "Family Event",
      location: "Food Court Area",
      participatingStores: ["Nike", "H&M"],
      isActive: true
    }
  ];

  // Sample news
  const sampleNews = [
    {
      title: "Westfield Plaza Wins Shopping Centre of the Year",
      excerpt: "We're thrilled to announce that Westfield Plaza has been recognized as Shopping Centre of the Year for exceptional customer experience.",
      content: "Westfield Plaza has been awarded the prestigious Shopping Centre of the Year award, recognizing our commitment to providing an exceptional shopping experience. This award reflects our dedication to customer service, innovative retail concepts, and community engagement. We thank our valued customers and retail partners for their continued support.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      category: "Centre News",
      author: "Marketing Team",
      publishDate: new Date('2024-07-15'),
      isPublished: true
    },
    {
      title: "New Sustainability Initiative Launched",
      excerpt: "Westfield Plaza introduces comprehensive recycling program and energy-efficient upgrades.",
      content: "As part of our commitment to environmental responsibility, Westfield Plaza has launched a comprehensive sustainability initiative. This includes a new recycling program, LED lighting upgrades, and partnerships with eco-friendly brands. We're proud to reduce our carbon footprint while providing a modern shopping experience.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      category: "Sustainability",
      author: "Sustainability Team",
      publishDate: new Date('2024-06-20'),
      isPublished: true
    },
    {
      title: "Community Art Program Supports Local Artists",
      excerpt: "Monthly rotating art exhibitions showcase talent from the local community.",
      content: "Westfield Plaza is proud to support local artists through our new Community Art Program. Each month, we feature rotating exhibitions showcasing the diverse talent in our community. The program provides emerging artists with exposure and helps create a culturally rich environment for our shoppers.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      category: "Community",
      author: "Community Relations",
      publishDate: new Date('2024-05-10'),
      isPublished: true
    }
  ];

  // Sample coming soon stores
  const sampleComingSoon = [
    {
      name: "Tesla Experience Centre",
      description: "Interactive showcase of Tesla vehicles and sustainable energy solutions.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      floor: "Ground Floor",
      unit: "G45",
      openingDate: new Date('2024-10-15'),
      category: "Automotive"
    },
    {
      name: "Gourmet Food Hall",
      description: "Premium food court featuring international cuisines and artisanal vendors.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      floor: "Food Court",
      unit: "FC01-10",
      openingDate: new Date('2024-11-01'),
      category: "Food & Dining"
    },
    {
      name: "Virtual Reality Gaming Lounge",
      description: "State-of-the-art VR gaming experience with the latest technology.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=400",
      floor: "Second Floor",
      unit: "S15",
      openingDate: new Date('2024-12-01'),
      category: "Entertainment"
    }
  ];

  try {
    // Insert sample data
    await db.insert(stores).values(sampleStores);
    console.log('✓ Stores inserted');
    
    await db.insert(events).values(sampleEvents);
    console.log('✓ Events inserted');
    
    await db.insert(news).values(sampleNews);
    console.log('✓ News articles inserted');
    
    await db.insert(comingSoonStores).values(sampleComingSoon);
    console.log('✓ Coming soon stores inserted');
    
    console.log('🎉 Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Run the seed function
seedData().catch(console.error);