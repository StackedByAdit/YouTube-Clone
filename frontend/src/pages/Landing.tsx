import axios from "axios";
import { useEffect, useState } from "react";
import { VideoCard } from "../components/VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt : string
  user: {
    channelName: string;
    profilePicture: string | null;
  };
}

export function Landing() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/videos")
      .then((response) => {
        setVideos(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ paddingTop: 80, textAlign: "center" }}>
        Loading videos...
      </div>
    );
  }

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

  return (
    <div
      style={{
        paddingTop: 80,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20
        }}
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            href={`/watch?id=${video.id}`}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            profilePicture={
              video.user.profilePicture ||
              "https://via.placeholder.com/40"
            }
            channelName={video.user.channelName}
            timeAgo={getTimeAgo(video.createdAt)}
          />
        ))}
      </div>
    </div>
  );
}