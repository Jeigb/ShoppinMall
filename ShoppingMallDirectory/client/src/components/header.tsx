import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag, Gift, Building2 } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Stores", href: "/#stores", current: location === "/" },
    { name: "Events", href: "/events", current: location === "/events" },
    { name: "Dining", href: "/#dining", current: false },
    { name: "Centre Map", href: "/#map", current: false },
    { name: "News", href: "/news", current: location === "/news" },
    { name: "Contact", href: "/contact", current: location === "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center text-2xl font-bold text-primary cursor-pointer">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Westfield Plaza
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-slate-700 hover:text-primary font-medium transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-primary hover:text-primary/90">
              <Gift className="mr-1 h-4 w-4" />
              Gift Cards
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Building2 className="mr-1 h-4 w-4" />
              Leasing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-6 space-y-6">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="block text-slate-700 hover:text-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="border-slate-200" />
                <Link 
                  href="/gift-cards"
                  className="block text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gift Cards
                </Link>
                <Link 
                  href="/leasing"
                  className="block text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Leasing
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
