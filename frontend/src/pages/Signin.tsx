import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignin() {
    setError("");

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/signin", {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);

      navigate("/");

    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else if (err.response?.status === 400) {
        setError("Invalid input");
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: 380,
          backgroundColor: "white",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: 30, textAlign: "center" }}>
          Sign in to your account
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <div style={{ color: "red", fontSize: 14, marginBottom: 15 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSignin}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 25,
            border: "none",
            backgroundColor: "#ff0000",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "0.2s"
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 14
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#065fd4", cursor: "pointer" }}
          >
            Create one
          </span>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: 14
};