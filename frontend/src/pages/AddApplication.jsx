import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const AddApplication = () => {
  const [form, setForm] = useState({ company: "", role: "", status: "Applied", applied_date: "", notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/applications", form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper px-6 py-14">
      <div className="max-w-lg mx-auto">
        <Link to="/dashboard" className="text-ink-soft text-sm hover:text-ink transition">← Applications</Link>
        <h1 className="font-display text-3xl text-ink mt-4 mb-8">Add application</h1>

        {error && (
          <p className="border border-clay/30 bg-clay/5 text-clay text-sm px-3 py-2 rounded mb-5">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="border border-line bg-card rounded-md p-8">
          <label className="block text-sm text-ink-soft mb-1">Company</label>
          <input type="text" name="company" value={form.company} onChange={handleChange} required
            className="w-full mb-4 px-3 py-2.5 rounded border border-line bg-paper text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition" />

          <label className="block text-sm text-ink-soft mb-1">Role</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} required
            className="w-full mb-4 px-3 py-2.5 rounded border border-line bg-paper text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition" />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-ink-soft mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded border border-line bg-paper text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition">
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Offer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-ink-soft mb-1">Applied date</label>
              <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded border border-line bg-paper text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition" />
            </div>
          </div>

          <label className="block text-sm text-ink-soft mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
            className="w-full mb-7 px-3 py-2.5 rounded border border-line bg-paper text-ink outline-none focus:border-forest focus:ring-1 focus:ring-forest transition resize-none" />

          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 bg-forest hover:bg-forest-dark text-paper font-medium py-2.5 rounded transition disabled:opacity-50">
              {loading ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => navigate("/dashboard")}
              className="flex-1 border border-line text-ink-soft hover:text-ink font-medium py-2.5 rounded transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;