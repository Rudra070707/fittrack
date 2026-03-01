import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../adminApi"; // ✅ FIXED

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await adminApi.get("/contact"); // ✅ FIXED

      if (!res.data?.success) {
        alert(res.data?.message || "Failed to load messages");
        return;
      }

      setMessages(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);

      // 🔥 Auto logout if token invalid
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        alert("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await adminApi.patch(`/contact/${id}/status`, { status });

      if (!res.data?.success) return alert(res.data.message || "Failed");
      fetchMessages();
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        alert("Update failed");
      }
    }
  };

  const deleteMsg = async (id) => {
    if (!confirm("Delete this message?")) return;

    try {
      const res = await adminApi.delete(`/contact/${id}`);

      if (!res.data?.success) return alert(res.data.message || "Failed");
      fetchMessages();
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } else {
        alert("Delete failed");
      }
    }
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