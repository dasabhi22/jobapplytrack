import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', applied_date: '', notes: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await api.get('/applications');
        const app = res.data.find((a) => a.id === Number(id));
        if (app) {
          setForm({
            company: app.company || '',
            role: app.role || '',
            status: app.status || 'Applied',
            applied_date: app.applied_date ? app.applied_date.slice(0, 10) : '',
            notes: app.notes || '',
          });
        }
      } catch (err) {
        setError('Failed to load application');
      } finally {
        setFetching(false);
      }
    };
    fetchApp();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.put(`/applications/${id}`, form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update application');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="min-h-screen bg-slate-900 text-slate-400 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-lg mx-auto bg-slate-800 p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Application</h1>

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
              {loading ? 'Updating...' : 'Update'}
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

export default EditApplication;