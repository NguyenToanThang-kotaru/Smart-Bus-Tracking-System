import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  onSearch,
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center w-full max-w-full bg-[#F5F5F5] rounded-full px-4 py-2 transition-all duration-200">
      {/* Input bên trái */}
      <input
        type="text"
        value={query}
        placeholder="Hinted search text"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
      />

      {/* Icon search bên phải */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center p-1 text-gray-500 hover:text-gray-700 transition"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
}
