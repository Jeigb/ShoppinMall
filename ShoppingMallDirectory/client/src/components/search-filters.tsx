import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    category?: string;
    subcategory?: string;
    floor?: string;
    isOpen?: boolean;
  }) => void;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [selectedOpenStatus, setSelectedOpenStatus] = useState<string>("all");

  const categories = [
    "Fashion & Apparel",
    "Beauty & Cosmetics",
    "Electronics",
    "Home & Garden",
    "Food & Dining",
    "Services",
    "Sports & Recreation"
  ];

  const subcategories = [
    "Women's Fashion",
    "Men's Fashion",
    "Kids & Baby",
    "Shoes & Accessories"
  ];

  const floors = [
    "Ground Floor",
    "First Floor",
    "Second Floor",
    "Food Court"
  ];

  const handleApplyFilters = () => {
    const filters: any = {};
    
    if (selectedCategory && selectedCategory !== "all") filters.category = selectedCategory;
    if (selectedSubcategory && selectedSubcategory !== "all") filters.subcategory = selectedSubcategory;
    if (selectedFloor && selectedFloor !== "all") filters.floor = selectedFloor;
    if (selectedOpenStatus && selectedOpenStatus !== "all") {
      filters.isOpen = selectedOpenStatus === "open";
    }
    
    onFiltersChange(filters);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedFloor("all");
    setSelectedOpenStatus("all");
    onFiltersChange({});
  };

  return (
    <Card className="shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2">Floor</Label>
            <Select value={selectedFloor} onValueChange={setSelectedFloor}>
              <SelectTrigger>
                <SelectValue placeholder="All Floors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                {floors.map((floor) => (
                  <SelectItem key={floor} value={floor}>
                    {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2">Subcategory</Label>
            <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2">Currently Open</Label>
            <Select value={selectedOpenStatus} onValueChange={setSelectedOpenStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="open">Open Now</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button 
              onClick={handleApplyFilters}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Filter className="mr-2 h-4 w-4" />
              Apply
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
