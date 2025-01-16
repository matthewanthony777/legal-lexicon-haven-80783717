import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";

const MenuItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavigationMenuItem>
    <Link to={to} className="block">
      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
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
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/articles">Articles</MenuItem>
            <MenuItem to="/career-insights">Career Insights</MenuItem>
            <MenuItem to="/collaborate">Collaborate</MenuItem>
            <MenuItem to="/about">About</MenuItem>
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