import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import EventCard from "@/components/event-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Calendar } from "lucide-react";
import type { Event } from "@shared/schema";

export default function Events() {
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("true");

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", { 
      type: typeFilter || undefined,
      isActive: activeFilter === "true" ? true : activeFilter === "false" ? false : undefined
    }],
  });

  const eventTypes = [
    "Featured Event",
    "Fashion Event", 
    "Family Event",
    "Community Event",
    "Sale Event",
    "Special Promotion"
  ];

  const handleClearFilters = () => {
    setTypeFilter("");
    setActiveFilter("true");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Events & Promotions
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover exciting events, special offers, and seasonal celebrations happening at Westfield Plaza
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
                  <Label className="text-sm font-medium text-slate-700 mb-2">Event Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Event Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Event Types</SelectItem>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2">Status</Label>
                  <Select value={activeFilter} onValueChange={setActiveFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Events</SelectItem>
                      <SelectItem value="true">Active Events</SelectItem>
                      <SelectItem value="false">Past Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                    className="flex-1"
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

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Events Found</h3>
              <p className="text-slate-600 mb-6">
                {typeFilter || activeFilter !== "true" 
                  ? "No events match your current filters." 
                  : "No events are currently scheduled."}
              </p>
              {(typeFilter || activeFilter !== "true") && (
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
