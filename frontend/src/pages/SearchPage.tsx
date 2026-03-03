import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VideoCard } from "../components/VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  user: {
    channelName: string;
    profilePicture: string | null;
  };
}

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    axios
      .get(`http://localhost:3000/api/search?q=${query}`)
      .then((res) => {
        setVideos(res.data);
      })
      .finally(() => setLoading(false));
  }, [query]);

  function getTimeAgo(dateString: string) {
    const now = new Date();
    const created = new Date(dateString);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
  }

  if (loading) {
    return (
      <div style={{ paddingTop: 90, textAlign: "center" }}>
        Searching...
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: 90,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh"
      }}
    >

      <div style={{ marginBottom: 30 }}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 6
          }}
        >
          Search Results
        </div>

        <div
          style={{
            fontSize: 14,
            color: "#606060"
          }}
        >
          {videos.length} result{videos.length !== 1 && "s"} for{" "}
          <span style={{ fontWeight: 500 }}>"{query}"</span>
        </div>
      </div>

      {videos.length === 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: 40,
            borderRadius: 12,
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            No videos found
          </div>
          <div style={{ color: "#606060", fontSize: 14 }}>
            Try different keywords.
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24
        }}
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            href={`/watch?id=${video.id}`}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            profilePicture={
              video.user.profilePicture || ""
            }
            channelName={video.user.channelName}
            timeAgo={getTimeAgo(video.createdAt)}
          />
        ))}
      </div>
    </div>
  );
}