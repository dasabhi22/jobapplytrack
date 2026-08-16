import { useEffect , useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const fetchApplications = async () =>{
        try{
            const response = await api.get("/applications");
            setApplications(response.data);
        }catch(err){
            setError(err.response?.data?.message || "Failed to fetch applications!");
        }finally{
            setLoading(false)
        }
    };
    useEffect(()=>{
        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        if(!confirm("Are you sure you want to delete this application?")) return;
        try{
            await api.delete(`/applications/${id}`);
            setApplications(applications.filter((app) => app.id !== id));
        }catch(err){
            setError(err.response?.data?.message || "Failed to delete application!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-slate-900 px-6 py-8">
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">My Applications</h1>
            <div className="flex gap-3">
                <Link to="/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition">
                + Add Application
                </Link>
                <button onClick={handleLogout} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-medium transition">
                Logout
                </button>
            </div>
            </div>

            {loading && <p className="text-slate-400">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}

            {!loading && applications.length === 0 && (
            <p className="text-slate-400">No applications yet. Add your first one.</p>
            )}

            {!loading && applications.length > 0 && (
            <div className="bg-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-700 text-slate-300 text-sm">
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Applied Date</th>
                    <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                    <tr key={app.id} className="border-t border-slate-700 text-slate-200">
                        <td className="px-4 py-3">{app.company}</td>
                        <td className="px-4 py-3">{app.role}</td>
                        <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                        <td className="px-4 py-3">
                        {app.applied_date ? new Date(app.applied_date).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-4 py-3">
                        <div className="flex gap-3">
                            <button onClick={() => navigate(`/edit/${app.id}`)} className="text-blue-400 hover:underline text-sm">Edit</button>
                            <button onClick={() => handleDelete(app.id)} className="text-red-400 hover:underline text-sm">Delete</button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
};

export default Dashboard;