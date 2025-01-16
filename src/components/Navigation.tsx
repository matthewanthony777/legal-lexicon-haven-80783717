import { FileText, Users, Info, Menu, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the home or about page
  const isHomeOrAbout = location.pathname === "/" || location.pathname === "/about";

  const menuItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/articles", label: "Articles", icon: FileText },
    { to: "/collaborate", label: "Collaborate", icon: Users },
    { to: "/about", label: "About Us", icon: Info },
  ];

  const MenuItem = ({ to, label, icon: Icon }) => (
    <Link to={to} onClick={() => setIsOpen(false)}>
      <NavigationMenuLink 
        className={`${navigationMenuTriggerStyle()} 
          bg-transparent
          dark:text-white
          ${isHomeOrAbout ? 'text-white' : 'text-zinc-900'}
          hover:bg-white/10
          border-none
          shadow-none
          transition-all 
          duration-300 
          hover:scale-105 
          active:scale-95
          font-playfair`}
      >
        {Icon && <Icon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />}
        {label}
      </NavigationMenuLink>
    </Link>
  );

  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent backdrop-blur-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList 
            className="bg-transparent 
              rounded-lg 
              transition-all 
              duration-300"
          >
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.to}>
                <MenuItem {...item} />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative transition-transform duration-300 hover:scale-110 active:scale-95 
                ${isHomeOrAbout ? 'text-white' : 'dark:text-white text-zinc-900'} 
                hover:bg-white/10`}
            >
              <Menu className="h-5 w-5 transition-opacity duration-200 ease-in-out" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="top" 
            className="w-full bg-transparent backdrop-blur-sm border-none pt-16"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-2 text-lg 
                    ${isHomeOrAbout ? 'text-white' : 'dark:text-white/80 text-zinc-900'}
                    transition-all duration-300 hover:bg-white/10 group rounded-lg font-playfair`}
                >
                  {item.icon && (
                    <item.icon className="mr-4 h-5 w-5 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
                  )}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile Title */}
        <div className="md:hidden">
          <Link 
            to="/" 
            className={`text-lg font-semibold transition-colors duration-300 hover:text-white/80 font-playfair
              ${isHomeOrAbout ? 'text-white' : 'dark:text-white text-zinc-900'}`}
          >
            Screen Scholar
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;