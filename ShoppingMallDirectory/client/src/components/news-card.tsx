import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { News } from "@shared/schema";

interface NewsCardProps {
  article: News;
}

export default function NewsCard({ article }: NewsCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "centre news":
        return "bg-primary-100 text-primary-800";
      case "sustainability":
        return "bg-emerald-100 text-emerald-800";
      case "community":
        return "bg-purple-100 text-purple-800";
      case "technology":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="aspect-video bg-slate-100 overflow-hidden">
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-500 text-sm">No image available</span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-slate-500 mb-3">
          <Badge className={`${getCategoryColor(article.category)} mr-3`}>
            {article.category}
          </Badge>
          <time>{format(new Date(article.publishDate), "MMMM d, yyyy")}</time>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-3 hover:text-primary transition-colors cursor-pointer">
          {article.title}
        </h3>
        <p className="text-slate-600 mb-4">
          {article.excerpt}
        </p>
        <button className="text-primary hover:text-primary/90 font-medium text-sm flex items-center">
          Read Full Article <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
