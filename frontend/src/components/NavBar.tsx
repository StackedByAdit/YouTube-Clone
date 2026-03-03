import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        backgroundColor: "white",
        borderBottom: "1px solid #e5e5e5",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 1000
      }}
    >
      {/* LEFT SECTION */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8f/YouTube_social_white_circle_%282024%29.svg"
          style={{ height: 36 }}
        />
        <div style={{ fontWeight: 600, fontSize: 20 }}>
          YouTube
        </div>
      </div>

      {/* CENTER SECTION (SEARCH) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 500,
            border: "1px solid #ccc",
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "#f9f9f9"
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search"
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: 14
            }}
          />

          <div
            onClick={handleSearch}
            style={{
              padding: "10px 16px",
              borderLeft: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Search size={18} strokeWidth={1.5} color="#606060" />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => navigate("/upload")}
          style={{
            padding: "8px 18px",
            borderRadius: 20,
            border: "none",
            backgroundColor: "#ff0000",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#cc0000")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#ff0000")
          }
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default NavBar;