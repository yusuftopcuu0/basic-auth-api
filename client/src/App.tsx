import { useState } from "react";
import { api } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [me, setMe] = useState<any>(null);

  const register = async () => {
    try {
      const res = await api.post("/auth/register", { username, password });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Login successful");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const getMe = async () => {
    try {
      const res = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMe(res.data.user);
      toast.success("User info fetched");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch user info");
    }
  };

  return (
    <div
      style={{ maxWidth: 300, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Auth App</h2>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={register} style={{ width: "100%", marginBottom: 10 }}>
        Register
      </button>

      <button onClick={login} style={{ width: "100%", marginBottom: 10 }}>
        Login
      </button>

      <button onClick={getMe} style={{ width: "100%", marginBottom: 10 }}>
        Get Me (Protected Route)
      </button>

      {me && (
        <div style={{ marginTop: 20 }}>
          <h3>User Info:</h3>
          <pre>{JSON.stringify(me, null, 2)}</pre>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
