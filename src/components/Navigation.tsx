import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";
import { Home, BookOpen, GraduationCap, Users, User } from "lucide-react";

const MenuItem = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: React.ComponentType<any> }) => (
  <NavigationMenuItem>
    <Link to={to} className="block">
      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 font-playfair italic">
        <Icon className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        {children}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const Navigation = () => {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <MenuItem to="/" icon={Home}>Home</MenuItem>
            <MenuItem to="/articles" icon={BookOpen}>Articles</MenuItem>
            <MenuItem to="/career-insights" icon={GraduationCap}>Career Insights</MenuItem>
            <MenuItem to="/collaborate" icon={Users}>Collaborate</MenuItem>
            <MenuItem to="/about" icon={User}>About</MenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;