import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-slate-800 text-white">
      {/* Newsletter Signup */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Be the first to know about new stores, exclusive offers, and special events at Westfield Plaza
            </p>
            <form className="max-w-md mx-auto flex" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-r-none text-slate-700"
                required
              />
              <Button 
                type="submit" 
                className="bg-white hover:bg-slate-100 text-primary rounded-l-none"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-xl font-bold mb-4 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Westfield Plaza
            </div>
            <p className="text-slate-300 mb-4">
              Your premier shopping destination with over 150 stores, dining, and entertainment options.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#stores" className="text-slate-300 hover:text-white transition-colors">Store Directory</Link></li>
              <li><Link href="/events" className="text-slate-300 hover:text-white transition-colors">Events & Promotions</Link></li>
              <li><Link href="/#map" className="text-slate-300 hover:text-white transition-colors">Centre Map</Link></li>
              <li><Link href="/news" className="text-slate-300 hover:text-white transition-colors">News & Updates</Link></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Personal Shopping</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Gift Wrapping</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Valet Parking</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Lost & Found</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Accessibility Services</a></li>
            </ul>
          </div>

          {/* Leasing & Business */}
          <div>
            <h4 className="font-semibold mb-4">Business</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Leasing Opportunities</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Property Management</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Marketing Partnerships</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Corporate Events</a></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 text-sm">
            © 2023 Westfield Plaza. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
