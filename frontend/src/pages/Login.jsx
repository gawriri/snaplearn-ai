import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //  LOGIN (BACKEND)
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        navigate("/age");
      } else {
        alert("Invalid login");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server. Make sure the backend is running on port 8000.");
    }
  };

  //  REGISTER (BACKEND)
  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please enter details");
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Registered successfully! Now login.");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server. Make sure the backend is running on port 8000.");
    }
  };

  return (
    <div>
      {/*  HEADER */}
      <div className="header">
        SnapLearn AI
      </div>

      <div className="container">
        <div className="card">
          <h2>Teacher Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button className="btn-orange" onClick={handleLogin}>
              Login
            </button>

            <button className="btn-blue" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}