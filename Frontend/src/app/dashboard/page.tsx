"use client";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import StarsBg from '@/components/stars_bg';
import NavbarInapp from '../navbarInapp/page';
import { useUser } from "@/hooks/useUser";

interface APOD {
  title: string;
  url: string;
  explanation: string;
  date: string;
  media_type: string;
  thumbnail_url?: string;
}

interface ViewedObject {
  title: string;
  timestamp: string;
  type: string;
  imageUrl?: string;
}

const DEFAULT_APOD: APOD = {
  title: "Cosmic View of the Day",
  url: " ",
  explanation: "Explore the wonders of our universe with our daily featured cosmic image. Due to high demand, we're currently showing our default cosmic view.",
  date: format(new Date(), 'yyyy-MM-dd'),
  media_type: "image"
};

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [apod, setApod] = useState<APOD | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showFullExplanation, setShowFullExplanation] = useState(false);
  const [viewedObjects, setViewedObjects] = useState<ViewedObject[]>([]);

  useEffect(() => {
    // Kiểm tra token, nếu không có thì chuyển hướng về trang đăng nhập
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Thiết lập lời chào dựa trên thời gian
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Fetch APOD data
    fetchAPOD();

    // Fetch recently viewed objects from history API
    fetchViewedObjects();
    // eslint-disable-next-line
  }, []);

  const fetchAPOD = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const cachedData = localStorage.getItem('apod_data');
      const cachedTime = localStorage.getItem('apod_timestamp');
      const now = new Date().getTime();

      if (cachedData && cachedTime && (now - parseInt(cachedTime)) < 6 * 60 * 60 * 1000) {
        setApod(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=YvsTc1oxYUEIgEMMHg7YJhcG5qvjSe2mu1CEYIFh');

      if (response.ok) {
        const data = await response.json();
        setApod(data);
        localStorage.setItem('apod_data', JSON.stringify(data));
        localStorage.setItem('apod_timestamp', now.toString());
      } else {
        console.error('Failed to fetch APOD, status:', response.status);
        if (response.status === 429) {
          setApiError("API rate limit reached. Using fallback data.");
          setApod(DEFAULT_APOD);
        } else {
          setApiError(`API error: ${response.status}`);
          setApod(DEFAULT_APOD);
        }
      }
    } catch (error) {
      console.error('Error fetching APOD:', error);
      setApiError("Failed to connect to NASA API. Using fallback data.");
      setApod(DEFAULT_APOD);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy dữ liệu history từ backend
  const fetchViewedObjects = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/history", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setViewedObjects(
        data
          .sort(
            (a: any, b: any) =>
              new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime()
          )
          .slice(0, 5)
          .map((item: any) => ({
            title: item.celestial_body?.name || "Unknown object",
            timestamp: item.viewed_at,
            type: item.celestial_body?.type || "",
            imageUrl: item.celestial_body?.image_url || "/images/default.jpg",
          }))
      );
    } catch {
      setViewedObjects([]);
    }
  };

  const toggleExplanation = () => {
    setShowFullExplanation(!showFullExplanation);
  };

  const VideoPlayer = ({ url, title }: { url: string, title: string }) => {
    return (
      <div className="video-container relative w-full">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <iframe
            src={url}
            title={title}
            className="w-full h-full absolute inset-0"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="video-controls mt-2 flex justify-between items-center">
          <span className="text-xs text-white/50">Video Content</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white/15 px-2 py-1 rounded hover:bg-white/25 transition-colors"
          >
            Open in New Tab
          </a>
        </div>
      </div>
    );
  };

  const ReadMoreButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="text-sm text-blue-300 hover:text-blue-200 transition-colors mt-1 focus:outline-none"
    >
      {showFullExplanation ? 'Show less' : 'Read more'}
    </button>
  );

  return (
    <div className="min-h-screen bg-black">
      <StarsBg />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-8">
          {/* Greeting Section */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {greeting}, {loading ? "..." : (user?.name || "Space Explorer")}!
              </h1>
              <p className="text-muted-foreground text-white">
                {format(new Date(), 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* APOD Section */}
            <div className="w-full bg-white/10 rounded-xl p-6 text-white backdrop-blur-md flex flex-col gap-6 shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">
                  Astronomy Picture of the Day
                </h2>
                {apiError && (
                  <button
                    onClick={fetchAPOD}
                    className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-colors"
                  >
                    Try again
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="aspect-video bg-white/5 rounded-lg" />
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                  <div className="h-4 w-1/2 bg-white/5 rounded" />
                </div>
              ) : apod ? (
                <div className="space-y-4">
                  {apod.media_type === "image" ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <img
                        src={apod.url}
                        alt={apod.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : apod.media_type === "video" ? (
                    <VideoPlayer url={apod.url} title={apod.title} />
                  ) : (
                    <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
                      <p className="text-white/70">Unsupported media type</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{apod.title}</h3>
                    {apiError && (
                      <p className="text-xs text-yellow-300 mt-1 mb-2">
                        {apiError}
                      </p>
                    )}
                    <p className={`text-sm text-white/70 ${showFullExplanation ? '' : 'line-clamp-3'} mt-1`}>
                      {apod.explanation}
                    </p>
                    <ReadMoreButton onClick={toggleExplanation} />
                    <p className="text-xs text-white/50 mt-2">{apod.date}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 py-8">
                  <p className="text-white/70">Failed to load APOD</p>
                  <button
                    onClick={fetchAPOD}
                    className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>

            {/* Recently Viewed Objects */}
            <div className="w-full bg-white/10 rounded-xl p-6 text-white backdrop-blur-md flex flex-col gap-6 shadow-lg">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Recently Viewed Objects
              </h2>
              <div className="space-y-4">
                {viewedObjects.length === 0 ? (
                  <p className="text-white/70">No recently viewed objects.</p>
                ) : (
                  viewedObjects.map((object, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-white/5" />
                        {object.imageUrl && (
                          <img
                            src={object.imageUrl}
                            alt={object.title}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{object.title}</h3>
                        <p className="text-sm text-white/70">{object.type}</p>
                      </div>
                      <time className="text-sm text-white/50 shrink-0">
                        {format(new Date(object.timestamp), 'HH:mm')}
                      </time>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}