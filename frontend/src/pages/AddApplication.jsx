import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddApplication = () =>{
    const [form, setForm] =  useState({
        company: '',
        role: '', 
        status: 'Applied', 
        applied_date: '', 
        notes: ''
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            await api.post("/applications", form);
            navigate('/dashboard');

        }catch(err){
            setError(err.response?.data?.message || "Failed to add application!");
        }finally{
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-lg mx-auto bg-slate-800 p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Add Application</h1>

        {error && <p className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300 mb-1">Company</label>
          <input type="text" name="company" value={form.company} onChange={handleChange} required
            className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />

          <label className="block text-sm text-slate-300 mb-1">Role</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} required
            className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />

          <label className="block text-sm text-slate-300 mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500">
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <label className="block text-sm text-slate-300 mb-1">Applied Date</label>
          <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange}
            className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />

          <label className="block text-sm text-slate-300 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
            className="w-full mb-6 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition disabled:opacity-50">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => navigate('/dashboard')}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
