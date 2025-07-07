import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import type { Store } from "@shared/schema";

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/stores/${store.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="aspect-video bg-slate-100 overflow-hidden">
          {store.image ? (
            <img 
              src={store.image} 
              alt={`${store.name} store interior`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <span className="text-slate-500 text-sm">No image available</span>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors">
              {store.name}
            </h3>
            <Badge variant={store.isOpen ? "default" : "secondary"} className="ml-2">
              <span className={`w-2 h-2 rounded-full mr-1 ${
                store.isOpen ? "bg-green-500" : "bg-red-500"
              }`} />
              {store.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
          <p className="text-slate-600 text-sm mb-3">{store.category}</p>
          <div className="flex items-center text-sm text-slate-500 mb-2">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{store.floor}, {store.unit}</span>
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <Clock className="mr-2 h-4 w-4" />
            <span>{store.hours}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
