import { VideoCard } from "../components/VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  user: {
    channelName: string;
    profilePicture: string;
  };
}

export function VideoPage() {

  const [searchParams] = useSearchParams();
  const [videoDetails, setVideoDetails] = useState<Video | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    axios
      .get("http://localhost:3000/api/videos/" + id)
      .then((response) => {
        setVideoDetails(response.data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/videos")
      .then((response) => {
        setRecommendedVideos(response.data);
      });
  }, []);

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

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ padding: 40, width: 900 }}>
        <video
          style={{
            width: "100%",
            borderRadius: 12,
            display: "block"
          }}
          src={videoDetails.videoUrl}
          controls
        />

        <p style={{ fontSize: 20 }}>{videoDetails.title}</p>

        <div style={{ display: "flex", gap: 20, fontSize: 17, marginBottom: 8 }}>
          <img
            style={{ height: 50, borderRadius: 50 }}
            src={videoDetails.user.profilePicture}
          />
          <p>{videoDetails.user.channelName}</p>
        </div>
      </div>

      <div style={{ padding: 10 }}>
        {recommendedVideos.map((video) => (
          <div key={video.id} style={{ padding: 8 }}>
            <VideoCard
              href={`/watch?id=${video.id}`}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
              profilePicture={video.user.profilePicture}
              channelName={video.user.channelName}
              timeAgo={getTimeAgo(video.createdAt)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}