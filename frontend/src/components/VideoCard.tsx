import { useNavigate } from "react-router-dom";

interface VideoDetails {
  profilePicture: string;
  title: string;
  channelName: string;
  thumbnailUrl: string;
  href: string;
  timeAgo: string;
}

export function VideoCard({
  profilePicture,
  channelName,
  title,
  thumbnailUrl,
  href,
  timeAgo
}: VideoDetails) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(href)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.02)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
      style={{
        width: "100%",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
    >
      <img
        src={thumbnailUrl}
        style={{
          width: "100%",
          borderRadius: 12,
          display: "block"
        }}
      />

      <div style={{ display: "flex", marginTop: 12 }}>
        <img
          src={profilePicture}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            marginRight: 12
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontWeight: 500, fontSize: 16, lineHeight: "20px" }}>
            {title}
          </div>

          <div style={{ fontSize: 14, marginTop: 4 }}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/channel/${channelName}`);
              }}
              style={{
                color: "#606060",
                cursor: "pointer",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#606060";
              }}
            >
              {channelName}
            </span>
            {" • "}
            <span style={{ color: "#606060" }}>
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}