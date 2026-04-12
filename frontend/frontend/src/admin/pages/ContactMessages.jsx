import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../adminApi";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await adminApi.get("/contact");
      const data = res.data || {};

      if (!data.success) {
        alert(data.message || "Failed to load messages");
        setMessages([]);
        return;
      }

      setMessages(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        alert(err?.response?.data?.message || "Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }

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
    try {
      const res = await adminApi.patch(`/contact/${id}/status`, { status });
      const data = res.data || {};
      if (!data.success) return alert(data.message || "Failed");
      fetchMessages();
    } catch (err) {
      const code = err?.response?.status;
      if (code === 401 || code === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        alert(err?.response?.data?.message || "Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }
      console.error(err);
      alert("Failed");
    }
  };

  const deleteMsg = async (id) => {
    if (!confirm("Delete this message?")) return;

    try {
      const res = await adminApi.delete(`/contact/${id}`);
      const data = res.data || {};
      if (!data.success) return alert(data.message || "Failed");
      fetchMessages();
    } catch (err) {
      const code = err?.response?.status;
      if (code === 401 || code === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        alert(err?.response?.data?.message || "Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }
      console.error(err);
      alert("Failed");
    }
  };

  return (
    <div className="p-6 text-white space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
          ADMIN / CONTACT
        </p>

        <h1 className="text-3xl font-extrabold mt-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          📥 Contact Messages
        </h1>

        <p className="text-gray-400 mt-2 max-w-xl">
          Manage user queries, support requests and feedback messages in one place.
        </p>
      </div>

      {/* STATES */}
      {loading ? (
        <div className="text-gray-300 animate-pulse">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-gray-400 text-sm">No messages yet.</div>
      ) : (

        <div className="space-y-6">

          {messages.map((m) => (
            <div
              key={m._id}
              className="
                relative
                bg-white/[0.04] backdrop-blur-2xl
                border border-white/10
                rounded-3xl p-6
                shadow-[0_30px_80px_rgba(0,0,0,0.75)]
                hover:shadow-[0_0_50px_rgba(34,197,94,0.3)]
                transition-all duration-300
                overflow-hidden
              "
            >

              {/* glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-green-400/20 blur-[130px] rounded-full" />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />

              <div className="flex items-start justify-between gap-4 relative z-10">

                <div>
                  <p className="font-semibold text-lg">{m.subject}</p>

                  <p className="text-gray-300 text-sm">
                    {m.fullName} • {m.email}
                  </p>

                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`
                    text-xs px-3 py-1 rounded-full border
                    ${
                      m.status === "new"
                        ? "border-green-400/40 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                        : m.status === "seen"
                        ? "border-yellow-400/40 text-yellow-300"
                        : "border-blue-400/40 text-blue-300"
                    }
                  `}
                >
                  {String(m.status || "").toUpperCase()}
                </span>
              </div>

              <p className="text-gray-200 mt-4 whitespace-pre-line relative z-10">
                {m.message}
              </p>

              <div className="flex flex-wrap gap-2 mt-5 relative z-10">

                <button
                  onClick={() => updateStatus(m._id, "seen")}
                  className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition"
                >
                  Mark Seen
                </button>

                <button
                  onClick={() => updateStatus(m._id, "resolved")}
                  className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition"
                >
                  Mark Resolved
                </button>

                <button
                  onClick={() => deleteMsg(m._id)}
                  className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition"
                >
                  Delete
                </button>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition"
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