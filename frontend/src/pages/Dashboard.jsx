import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import StatusTag from "../components/StatusTag";
import api from "../api/axios";

const statusBorder = {
  Applied: "border-dusk",
  Interview: "border-gold",
  Rejected: "border-clay",
  Offer: "border-forest",
};

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    try {
      await api.delete(`/applications/${id}`);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete application");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const counts = {
    total: applications.length,
    interview: applications.filter((a) => a.status === "Interview").length,
    offer: applications.filter((a) => a.status === "Offer").length,
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="flex items-start justify-between">
          <h1 className="font-display text-4xl text-ink">Applications</h1>
          <button onClick={handleLogout} className="text-ink-soft text-sm hover:text-ink transition mt-2">
            Log out
          </button>
        </div>

        {!loading && applications.length > 0 && (
          <div className="flex gap-8 mt-6 mb-10 pb-8 border-b border-line">
            <div>
              <p className="font-display text-3xl text-ink">{counts.total}</p>
              <p className="text-ink-soft text-sm">Total logged</p>
            </div>
            <div>
              <p className="font-display text-3xl text-dusk">{counts.interview}</p>
              <p className="text-ink-soft text-sm">In interview</p>
            </div>
            <div>
              <p className="font-display text-3xl text-forest">{counts.offer}</p>
              <p className="text-ink-soft text-sm">Offers</p>
            </div>
            <div className="ml-auto self-end">
              <Link to="/add" className="inline-block bg-forest hover:bg-forest-dark text-paper text-sm font-medium px-4 py-2.5 rounded transition">
                Add application
              </Link>
            </div>
          </div>
        )}

        {loading && <p className="text-ink-soft mt-8">Loading…</p>}
        {error && <p className="text-clay mt-8">{error}</p>}

        {!loading && applications.length === 0 && (
          <div className="border border-line rounded-md p-10 text-center mt-8">
            <p className="text-ink-soft mb-4">Nothing logged yet. Add the first application you sent.</p>
            <Link to="/add" className="inline-block bg-forest hover:bg-forest-dark text-paper text-sm font-medium px-4 py-2.5 rounded transition">
              Add application
            </Link>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div>
            {applications.map((app) => (
              <div key={app.id}
                className={`flex items-center justify-between border-l-4 ${statusBorder[app.status] || "border-line"} bg-card border-y border-r border-line rounded-r-md px-5 py-4 mb-3`}>
                <div className="flex-1 min-w-0">
                  <p className="text-ink font-medium truncate">{app.company}</p>
                  <p className="text-ink-soft text-sm truncate">{app.role}</p>
                </div>
                <div className="hidden sm:block w-28 text-sm text-ink-soft">
                  {app.applied_date ? new Date(app.applied_date).toLocaleDateString() : "—"}
                </div>
                <div className="w-24 text-right">
                  <StatusTag status={app.status} />
                </div>
                <div className="flex gap-4 ml-6">
                  <button onClick={() => navigate(`/edit/${app.id}`)} className="text-ink-soft text-sm hover:text-forest transition">Edit</button>
                  <button onClick={() => handleDelete(app.id)} className="text-ink-soft text-sm hover:text-clay transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;