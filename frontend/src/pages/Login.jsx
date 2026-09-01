import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-paper">
      <div className="hidden md:flex md:w-5/12 bg-ink text-paper flex-col justify-between p-12">
        <span className="font-display text-lg">ApplyTrack</span>
        <div>
          <h1 className="font-display text-4xl leading-tight mb-4">
            Every application,<br />one running record.
          </h1>
          <p className="text-paper/70 max-w-xs">
            Log where you've applied, where you stand, and what to follow up
            on instead of losing it across tabs and spreadsheets.
          </p>
        </div>
        <p className="text-paper/40 text-sm">Welcome back</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-display text-3xl text-ink mb-1">Log in</h2>
          <p className="text-ink-soft mb-8">Pick up your job search where you left off.</p>

          {error && (
            <p className="border border-clay/30 bg-clay/5 text-clay text-sm px-3 py-2 rounded mb-5">
              {error}
            </p>
          )}

          <label className="block text-sm text-ink-soft mb-1" htmlFor="email">Email</label>
          <input
            id="email" type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full mb-4 px-3 py-2.5 rounded border border-line bg-card text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition"
          />

          <label className="block text-sm text-ink-soft mb-1" htmlFor="password">Password</label>
          <input
            id="password" type="password" name="password" value={form.password} onChange={handleChange} required
            className="w-full mb-7 px-3 py-2.5 rounded border border-line bg-card text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition"
          />

          <button type="submit" disabled={loading}
            className="w-full bg-forest hover:bg-forest-dark text-paper font-medium py-2.5 rounded transition disabled:opacity-50">
            {loading ? "Logging in…" : "Log in"}
          </button>

          <p className="text-ink-soft text-sm mt-6">
            No account yet?{" "}
            <Link to="/register" className="text-forest font-medium hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;