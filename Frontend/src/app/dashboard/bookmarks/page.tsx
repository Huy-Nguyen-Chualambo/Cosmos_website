"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";

interface BookmarkedObject {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  description?: string;
  distance_light_years?: number;
  mass_solar?: number;
  dateAdded?: string;
  notes?: string;
  collection?: string;
}

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedObjects, setBookmarkedObjects] = useState<BookmarkedObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/favorite", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch bookmarks");
        const data = await response.json();
        setBookmarkedObjects(
          data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: item.type,
            imageUrl: item.image_url || "/images/default.jpg",
            description: item.description,
            distance_light_years: item.distance_light_years,
            mass_solar: item.mass_solar,
            dateAdded: item.date_added || "",
            notes: item.notes,
            collection: item.collection_name || "",
          }))
        );
      } catch (error) {
        setBookmarkedObjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const filteredObjects = searchQuery
    ? bookmarkedObjects.filter(object =>
        (object.name && object.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (object.description && object.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : bookmarkedObjects;

  const handleRemoveBookmark = async (name: string) => {
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
      if (data.is_favorited === false) {
        setBookmarkedObjects((prev) => prev.filter((obj) => obj.name !== name));
      }
    } catch {
      // handle error if needed
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white/90">Bookmarks</h1>
        <p className="text-muted-foreground mt-2">
          Your saved celestial objects
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-white/70">Loading...</p>
          </div>
        ) : filteredObjects.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-white/70">No bookmarks found matching your search.</p>
          </div>
        ) : (
          filteredObjects.map((object) => (
            <Card key={object.id ? `${object.id}-${object.name}` : object.name} className="overflow-hidden bg-white/10 border-white/20">
              <div className="relative h-48">
                {object.imageUrl && (
                  <img
                    src={object.imageUrl}
                    alt={object.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-destructive"
                  onClick={() => handleRemoveBookmark(object.name)}
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="h-4 w-4" />
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
          ))
        )}
      </div>
    </div>
  );
}