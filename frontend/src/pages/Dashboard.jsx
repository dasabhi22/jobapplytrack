import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

const Dashboard = () => {
    const [applications, setApplications] = useState([
        {

        id: 1,
        company: 'Google',
        role: 'Software Engineer',
        status: 'Applied',
        applied_date: '2026-08-10'
        },
        {
        id: 2,
        company: 'Microsoft',
        role: 'Frontend Developer',
        status: 'Interview',
        applied_date: '2026-08-08'
        },
        {
        id: 3,
        company: 'Amazon',
        role: 'Full Stack Developer',
        status: 'Rejected',
        applied_date: '2026-08-05'
        }
    ]);

    const navigate = useNavigate();

    return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            My Applications
          </h1>

          <div className="flex gap-3">
            <Link
              to="/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
            >
              + Add Application
            </Link>

            <button
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>

        {applications.length === 0 && (
            <p className="text-slate-400">
            No applications yet. Add your first one.
          </p>
        )}

        {applications.length > 0 && (
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
                  <tr
                    key={app.id}
                    className="border-t border-slate-700 text-slate-200"
                  >
                    <td className="px-4 py-3">
                      {app.company}
                    </td>

                    <td className="px-4 py-3">
                      {app.role}
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>

                    <td className="px-4 py-3">
                      {new Date(app.applied_date).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/edit/${app.id}`)}
                          className="text-blue-400 hover:underline text-sm"
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-400 hover:underline text-sm"
                        >
                          Delete
                        </button>
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