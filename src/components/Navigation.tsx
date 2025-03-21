
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Home, BookOpen, Users, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const MenuItem = ({ to, children, icon: Icon, isMobile = false }: { 
  to: string; 
  children: React.ReactNode; 
  icon: React.ComponentType<any>;
  isMobile?: boolean;
}) => {
  const baseClasses = "group inline-flex items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 font-playfair";
  const mobileClasses = "w-full justify-start";

  return (
    <NavigationMenuItem className={isMobile ? "w-full" : ""}>
      <Link to={to} className={isMobile ? "w-full block" : "block"}>
        <NavigationMenuLink className={`${baseClasses} ${isMobile ? mobileClasses : ""}`}>
          <Icon className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const MobileMenu = () => (
  <NavigationMenu className="w-full">
    <NavigationMenuList className="flex-col space-y-4 mt-4">
      <MenuItem to="/" icon={Home} isMobile>Home</MenuItem>
      <MenuItem to="/articles" icon={BookOpen} isMobile>Future-Insights</MenuItem>
      <MenuItem to="/about" icon={User} isMobile>Our Expertise</MenuItem>
      <MenuItem to="/collaborate" icon={Users} isMobile>Collaborate</MenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const Navigation = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="border-b shadow-sm shadow-[#0000001a]">
      <div className="container flex h-16 items-center px-4">
        {isMobile ? (
          <div className="flex justify-center w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="top" 
                className="w-full sm:max-w-md mx-auto bg-background/85 backdrop-blur-sm pt-12 rounded-b-xl"
                style={{ left: '50%', transform: 'translateX(-50%)', right: 'auto' }}
              >
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              <MenuItem to="/" icon={Home}>Home</MenuItem>
              <MenuItem to="/articles" icon={BookOpen}>Future-Insights</MenuItem>
              <MenuItem to="/about" icon={User}>Our Expertise</MenuItem>
              <MenuItem to="/collaborate" icon={Users}>Collaborate</MenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
