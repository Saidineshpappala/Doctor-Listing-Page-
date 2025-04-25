
import { Doctor } from "@/types/doctor";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  doctors: Doctor[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({ doctors, searchQuery, onSearchChange }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchedDoctors = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(query))
      .slice(0, 3); // Only show top 3 matches

    setSuggestions(matchedDoctors);
  }, [searchQuery, doctors]);

  useEffect(() => {
    // Close suggestions on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (doctorName: string) => {
    onSearchChange(doctorName);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-medical-primary focus:border-medical-primary text-sm"
          placeholder="Search doctor by name"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-testid="autocomplete-input"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map(doctor => (
              <li 
                key={doctor.id}
                onClick={() => handleSuggestionClick(doctor.name)}
                className="px-4 py-2 hover:bg-medical-light cursor-pointer text-sm"
                data-testid="suggestion-item"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
