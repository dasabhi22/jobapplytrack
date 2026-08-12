import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({
        ...form,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            const response = await api.post("/auth/login", form);
            localStorage.setItem('token', response.data.token);
            navigate("/dashboard");
        }catch(err){
            setError(err.response?.data?.message || "Login failed!")
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
            <h1 className="text-2xl font-bold text-white mb-6">Login</h1>

            {error && <p className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4">{error}</p>}

            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required
            className="w-full mb-6 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />

            <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-slate-400 text-sm mt-4 text-center">
            No account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
            </p>
        </form>
        </div>
    );
    };

export default Login;