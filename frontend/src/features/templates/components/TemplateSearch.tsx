import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useTemplate } from "../context/TemplateContext";

export default function TemplateSearch() {
  const { search, setSearch } = useTemplate();

  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-3 text-neutral-500"
      />

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search templates..."
        className="pl-9"
      />
    </div>
  );
}