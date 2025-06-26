import { useState, useCallback } from "react";

interface CelestialObject {
  name: string;
  imageUrl?: string;
  description?: string;
  distance_light_years?: number;
  mass_solar?: number;
}

export function useCelestialObject() {
  const [object, setObject] = useState<CelestialObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCelestialObject = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/information?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("Failed to fetch celestial object");
      const data = await res.json();
      setObject({
        name: data.name,
        imageUrl: data.image_url,
        description: data.description,
        distance_light_years: data.distance_light_years,
        mass_solar: data.mass_solar,
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setObject(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { object, loading, error, fetchCelestialObject };
}