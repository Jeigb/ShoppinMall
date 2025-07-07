import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Store as StoreIcon, MapPin, Calendar, Info } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StoreCard from "@/components/store-card";
import EventCard from "@/components/event-card";
import NewsCard from "@/components/news-card";
import SearchFilters from "@/components/search-filters";
import type { Store, Event, News, ComingSoonStore } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [storeFilters, setStoreFilters] = useState<any>({});
  const [selectedFloor, setSelectedFloor] = useState("ground");

  // Fetch stores with filters and search
  const { data: stores = [], isLoading: storesLoading } = useQuery<Store[]>({
    queryKey: ["/api/stores", { ...storeFilters, search: searchQuery }],
  });

  // Fetch events
  const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", { isActive: true }],
  });

  // Fetch news
  const { data: news = [], isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ["/api/news", { isPublished: true }],
  });

  // Fetch coming soon stores
  const { data: comingSoonStores = [] } = useQuery<ComingSoonStore[]>({
    queryKey: ["/api/coming-soon"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is automatically triggered by query key change
  };

  const handleFiltersChange = (filters: any) => {
    setStoreFilters(filters);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="relative h-96 lg:h-[500px] bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&h=500')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        >
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Discover Your Perfect
              <span className="text-accent"> Shopping Experience</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-slate-100">
              Over 150 stores, restaurants, and services all under one roof
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search stores, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-xl text-slate-700 text-lg placeholder-slate-500 shadow-lg"
                />
                <Button 
                  type="submit"
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-primary/20"
                >
                  <Search className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('stores')}
            >
              <CardContent className="bg-gradient-to-br from-primary-50 to-primary-100 p-6">
                <StoreIcon className="text-primary text-3xl mb-3 h-8 w-8" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Store Directory</h3>
                <p className="text-slate-600 text-sm">Browse all 150+ stores and services</p>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('map')}
            >
              <CardContent className="bg-gradient-to-br from-accent-50 to-orange-100 p-6">
                <MapPin className="text-accent text-3xl mb-3 h-8 w-8" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Centre Map</h3>
                <p className="text-slate-600 text-sm">Interactive floor plan and directions</p>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('events')}
            >
              <CardContent className="bg-gradient-to-br from-emerald-50 to-green-100 p-6">
                <Calendar className="text-emerald-600 text-3xl mb-3 h-8 w-8" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Events & Offers</h3>
                <p className="text-slate-600 text-sm">Latest promotions and activities</p>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              <CardContent className="bg-gradient-to-br from-purple-50 to-violet-100 p-6">
                <Info className="text-purple-600 text-3xl mb-3 h-8 w-8" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Centre Info</h3>
                <p className="text-slate-600 text-sm">Hours, contact, and services</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section id="stores" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Store Directory
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover amazing brands and unique shopping experiences across all floors
            </p>
          </div>

          <SearchFilters onFiltersChange={handleFiltersChange} />

          {storesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">Loading stores...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stores.slice(0, 8).map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>

              {stores.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600">No stores found matching your criteria.</p>
                </div>
              )}

              {stores.length > 8 && (
                <div className="text-center mt-12">
                  <Button variant="outline" className="px-8 py-3">
                    Load More Stores
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Events */}
      <section id="events" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Events & Promotions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Don't miss out on our latest offers, special events, and seasonal celebrations
            </p>
          </div>

          {eventsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">Loading events...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {events.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {events.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600">No events currently scheduled.</p>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-3">
              View All Events & Promotions
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Exciting new stores and experiences opening at Westfield Plaza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonStores.slice(0, 3).map((store) => (
              <Card key={store.id} className="overflow-hidden">
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  {store.image ? (
                    <img 
                      src={store.image} 
                      alt={`${store.name} preview`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <span className="text-slate-500 text-sm">No image available</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">{store.name}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Calendar className="mr-1 h-3 w-3" />
                      Opening Soon
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">{store.description}</p>
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{store.floor}, {store.unit}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Opening {new Date(store.openingDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section id="map" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Centre Map
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Navigate our three-level shopping center with ease
            </p>
          </div>

          {/* Floor Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 p-1 rounded-lg inline-flex">
              {["ground", "first", "second", "food-court"].map((floor) => (
                <Button
                  key={floor}
                  variant={selectedFloor === floor ? "default" : "ghost"}
                  onClick={() => setSelectedFloor(floor)}
                  className="px-6 py-2"
                >
                  {floor.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} Floor
                </Button>
              ))}
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-slate-50 rounded-xl p-8 text-center min-h-[500px] flex items-center justify-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl text-slate-300 mb-4">
                <MapPin className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Interactive Floor Plan</h3>
              <p className="text-slate-600 mb-6">
                The interactive SVG floor plan will be embedded here, showing all store locations with clickable areas for detailed information.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded mr-2"></div>
                  <span>Fashion & Retail</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-accent rounded mr-2"></div>
                  <span>Food & Dining</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
                  <span>Services</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                  <span>Entertainment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              What's Unfolding
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and happenings at Westfield Plaza
            </p>
          </div>

          {newsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">Loading news...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {news.slice(0, 4).map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>

              {news.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600">No news articles available.</p>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-3">
              View All News & Updates
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
