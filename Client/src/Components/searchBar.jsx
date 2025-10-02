import { useState } from "react";
import { Search } from "lucide-react"; // icon từ lucide-react
import clearSearch from "../assets/Icon/clearSearch.png";

export default function SearchBar({ placeholder = "Tìm kiếm...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch(""); // Gọi hàm onSearch với chuỗi rỗng
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", query);
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full max-w-md bg-white rounded-4xl shadow-md px-3 py-2">
      {/* Icon */}
      <Search className="w-5 h-5 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-3 py-1 outline-none bg-transparent text-gray-700"
      />

      {/* Button search */}
      <button onClick={handleClear} className="cursor-pointer">
        <img src={clearSearch} alt="" />
      </button>
    </div>
  );
}
