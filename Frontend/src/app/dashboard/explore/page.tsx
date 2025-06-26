"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCelestialObject } from "@/hooks/useCelestialObject";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [objects, setObjects] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autocompleteResults, setAutocompleteResults] = useState<{ name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchObjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/search?name=");
        if (!response.ok) throw new Error("Failed to fetch celestial objects");
        const data = await response.json();
        setObjects(data.map((item: any) => ({ name: item.name })));
      } catch {
        setObjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchObjects();
  }, []);

  const fetchAutocomplete = async (query: string) => {
    if (!query) {
      setAutocompleteResults([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/search?name=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      setAutocompleteResults(data.map((item: any) => ({ name: item.name })));
    } catch {
      setAutocompleteResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    fetchAutocomplete(e.target.value);
  };
  
  const handleSuggestionClick = async (name: string) => {
    setSearchQuery(name);
    setShowSuggestions(false);
    // Lọc lại chỉ còn object được chọn
    setObjects([{ name }]);
    // Gọi API lưu vào history
    try {
      await fetch("http://localhost:8000/api/history/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
    } catch {}
  };

  const filteredObjects = searchQuery
    ? objects.filter(object =>
        object.name && object.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : objects;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white/90">Explore</h1>
        <p className="text-muted-foreground mt-2">
          Discover the wonders of the cosmos
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="w-full bg-white/10 backdrop-blur-md rounded-xl overflow-hidden flex items-center px-4 border border-white/20 focus-within:border-white/40 transition-colors">
          <Search className="h-5 w-5 text-white/50 mr-2 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search celestial objects..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50 h-12"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            autoComplete="off"
          />
        </div>
        {showSuggestions && autocompleteResults.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-zinc-900 border border-white/20 rounded-b-xl max-h-60 overflow-y-auto">
            {autocompleteResults.map((item) => (
              <li
                key={item.name}
                className="px-4 py-2 cursor-pointer hover:bg-white/10 text-white"
                onClick={() => handleSuggestionClick(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-white/70">Loading...</p>
          </div>
        ) : filteredObjects.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-white/70">No celestial objects found matching your search.</p>
          </div>
        ) : (
          filteredObjects.map((object) => (
            <CelestialCard key={object.name} name={object.name} />
          ))
        )}
      </div>
    </div>
  );
}

// Card component sử dụng hook để fetch từng object detail
function CelestialCard({ name }: { name: string }) {
  const { object, loading, fetchCelestialObject } = useCelestialObject();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    fetchCelestialObject(name);
    // eslint-disable-next-line
  }, [name]);

  // Kiểm tra trạng thái bookmark khi Card mount
  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/favorite/check?name=${encodeURIComponent(name)}`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsBookmarked(data.is_favorited);
      } catch {
        setIsBookmarked(false);
      }
    };
    checkBookmark();
  }, [name]);

  // Toggle bookmark
  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/favorite/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setIsBookmarked(data.is_favorited);
    } catch {
      // handle error if needed
    } finally {
      setBookmarkLoading(false);
    }
  };
  if (loading || !object) {
    return (
      <Card className="overflow-hidden bg-white/10 border-white/20">
        <div className="h-48 flex items-center justify-center text-white/70">Loading...</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-white/10 border-white/20">
      <div className="relative h-48">
        {object.imageUrl && (
          <img
            src={object.imageUrl}
            alt={object.name}
            className="w-full h-full object-cover"
          />
        )}
        <button
          className={`absolute top-4 right-4 p-2 rounded-full transition ${
            isBookmarked ? "bg-yellow-400/80 text-black" : "bg-white/10 text-white/90"
          } hover:bg-yellow-400/90`}
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          aria-label="Bookmark"
        >
          <Bookmark
            className={`h-4 w-4 ${isBookmarked ? "fill-yellow-400 stroke-yellow-400" : ""}`}
            fill={isBookmarked ? "#facc15" : "none"}
          />
        </button>
      </div>
      <CardHeader>
        <CardTitle className="text-white/90">{object.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-white/70">{object.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/50">Distance (light years)</p>
              <p className="font-medium text-white/90">{object.distance_light_years ?? "Unknown"}</p>
            </div>
            <div>
              <p className="text-white/50">Mass (solar mass)</p>
              <p className="font-medium text-white/90">{object.mass_solar ?? "Unknown"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}