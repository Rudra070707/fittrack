import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAdminToken = () => localStorage.getItem("adminToken");

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const token = getAdminToken();
      if (!token) {
        setMessages([]);
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      // ✅ If token invalid/not admin, reset and send to login
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        alert(data.message || "Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        console.error("GET /api/contact failed:", res.status, data);
        alert(data.message || `API failed (${res.status})`);
        return;
      }

      if (!data.success) {
        alert(data.message || "Failed to load messages");
        return;
      }

      setMessages(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      alert("Server error (backend down / CORS issue)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, []);

  const updateStatus = async (id, status) => {
    const token = getAdminToken();
    if (!token) return alert("Please login again.");

    const res = await fetch(`http://localhost:5000/api/contact/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      alert(data.message || "Session expired. Please login again.");
      navigate("/admin/login");
      return;
    }

    if (!res.ok || !data.success) return alert(data.message || "Failed");
    fetchMessages();
  };

  const deleteMsg = async (id) => {
    const token = getAdminToken();
    if (!token) return alert("Please login again.");

    if (!confirm("Delete this message?")) return;

    const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      alert(data.message || "Session expired. Please login again.");
      navigate("/admin/login");
      return;
    }

    if (!res.ok || !data.success) return alert(data.message || "Failed");
    fetchMessages();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📥 Contact Messages</h1>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-300">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-lg">{m.subject}</p>
                  <p className="text-gray-300 text-sm">
                    {m.fullName} • {m.email}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    m.status === "new"
                      ? "border-green-400/40 text-green-300"
                      : m.status === "seen"
                      ? "border-yellow-400/40 text-yellow-300"
                      : "border-blue-400/40 text-blue-300"
                  }`}
                >
                  {String(m.status || "").toUpperCase()}
                </span>
              </div>

              <p className="text-gray-200 mt-4 whitespace-pre-line">
                {m.message}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => updateStatus(m._id, "seen")}
                  className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30"
                >
                  Mark Seen
                </button>
                <button
                  onClick={() => updateStatus(m._id, "resolved")}
                  className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30"
                >
                  Mark Resolved
                </button>
                <button
                  onClick={() => deleteMsg(m._id)}
                  className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30"
                >
                  Delete
                </button>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                    m.email
                  }&su=${encodeURIComponent(`Re: ${m.subject || ""}`)}`}
                >
                  Reply Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
