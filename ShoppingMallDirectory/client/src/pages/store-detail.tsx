import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Phone, Globe, Navigation } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "wouter";
import type { Store } from "@shared/schema";

export default function StoreDetail() {
  const { id } = useParams();
  
  const { data: store, isLoading, error } = useQuery<Store>({
    queryKey: [`/api/stores/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-slate-600">Loading store details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Store Not Found</h1>
                <p className="text-slate-600 mb-6">The store you're looking for doesn't exist or has been removed.</p>
                <Link href="/">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store Directory
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Image */}
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
            {store.image ? (
              <img 
                src={store.image} 
                alt={`${store.name} store interior`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <span className="text-slate-500 text-lg">No image available</span>
              </div>
            )}
          </div>

          {/* Store Information */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-slate-800">{store.name}</h1>
              <Badge variant={store.isOpen ? "default" : "secondary"} className="ml-4">
                <span className={`w-2 h-2 rounded-full mr-1 ${
                  store.isOpen ? "bg-green-500" : "bg-red-500"
                }`} />
                {store.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>

            <p className="text-lg text-primary font-medium mb-6">{store.category}</p>

            {store.description && (
              <p className="text-slate-600 mb-8 leading-relaxed">{store.description}</p>
            )}

            {/* Store Details */}
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                <div>
                  <span className="font-medium text-slate-800">Location: </span>
                  <span className="text-slate-600">{store.floor}, {store.unit}</span>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-slate-400 mr-3" />
                <div>
                  <span className="font-medium text-slate-800">Hours: </span>
                  <span className="text-slate-600">{store.hours}</span>
                </div>
              </div>

              {store.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-slate-400 mr-3" />
                  <div>
                    <span className="font-medium text-slate-800">Phone: </span>
                    <a href={`tel:${store.phone}`} className="text-primary hover:text-primary/80">
                      {store.phone}
                    </a>
                  </div>
                </div>
              )}

              {store.website && (
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-slate-400 mr-3" />
                  <div>
                    <span className="font-medium text-slate-800">Website: </span>
                    <a 
                      href={store.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="flex-1">
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
              <Button variant="outline" className="flex-1">
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="mt-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Category</h3>
                <p className="text-slate-600">{store.category}</p>
                {store.subcategory && (
                  <>
                    <h3 className="font-semibold text-slate-800 mb-2 mt-4">Subcategory</h3>
                    <p className="text-slate-600">{store.subcategory}</p>
                  </>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Accessibility</h3>
                <p className="text-slate-600">Wheelchair accessible</p>
                <p className="text-slate-600">Hearing loop available</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Services</h3>
                <p className="text-slate-600">Gift wrapping available</p>
                <p className="text-slate-600">Personal shopping assistance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
