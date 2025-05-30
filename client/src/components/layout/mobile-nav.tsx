import { Link, useLocation } from "wouter";
import { Home, Info, Package, Mail } from "lucide-react";

const navigation = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Tentang", href: "/about", icon: Info },
  { name: "Fitur", href: "/features", icon: Package },
  { name: "Kontak", href: "/contact", icon: Mail },
];

export function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-40">
      <div className="grid grid-cols-4 h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mobile-nav-item ${isActive ? "active" : ""} hover:scale-110 transition-all duration-200`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "animate-bounce" : ""}`} />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
