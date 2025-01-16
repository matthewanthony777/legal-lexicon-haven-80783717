import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ArticleFiltersProps {
  onSearchChange: (value: string) => void;
}

const ArticleFilters = ({
  onSearchChange,
}: ArticleFiltersProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ArticleFilters;