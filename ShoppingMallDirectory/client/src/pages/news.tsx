import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NewsCard from "@/components/news-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Newspaper } from "lucide-react";
import type { News } from "@shared/schema";

export default function News() {
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news", { 
      category: categoryFilter || undefined,
      isPublished: true
    }],
  });

  const categories = [
    "Centre News",
    "Sustainability", 
    "Community",
    "Technology",
    "Retail",
    "Events"
  ];

  const handleClearFilters = () => {
    setCategoryFilter("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              What's Unfolding
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and developments at Westfield Plaza
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                    disabled={!categoryFilter}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">Loading news...</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {news.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No News Articles Found</h3>
              <p className="text-slate-600 mb-6">
                {categoryFilter 
                  ? "No news articles match your current category filter." 
                  : "No news articles are currently available."}
              </p>
              {categoryFilter && (
                <Button onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
