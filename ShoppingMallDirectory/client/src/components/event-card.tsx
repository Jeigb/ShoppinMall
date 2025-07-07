import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "featured event":
        return "bg-accent-100 text-accent-800";
      case "fashion event":
        return "bg-primary-100 text-primary-800";
      case "family event":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getGradientClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "featured event":
        return "from-primary-50 to-blue-100";
      case "fashion event":
        return "from-emerald-50 to-green-100";
      case "family event":
        return "from-purple-50 to-violet-100";
      default:
        return "from-slate-50 to-slate-100";
    }
  };

  return (
    <Card className={`group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-br ${getGradientClass(event.type)}`}>
      <div className="aspect-video bg-slate-100 overflow-hidden">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-500 text-sm">No image available</span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-primary font-medium mb-2">
          <Calendar className="mr-2 h-4 w-4" />
          <span>
            {format(new Date(event.startDate), "MMM d")} - {format(new Date(event.endDate), "MMM d")}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-slate-600 mb-4">
          {event.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge className={getEventTypeColor(event.type)}>
            {event.type}
          </Badge>
          <Button variant="ghost" className="text-primary hover:text-primary/90 font-medium text-sm p-0">
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
