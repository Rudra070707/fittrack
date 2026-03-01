import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL; // ✅ FIXED

export default function Settings() {
  const [gymName, setGymName] = useState("FitTrack Fitness Club");
  const [branch, setBranch] = useState("Mumbai — Andheri West");
  const [supportEmail, setSupportEmail] = useState("support@fittrack.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [gst, setGst] = useState("GSTINXXXXXXXX");
  const [hours, setHours] = useState("Mon–Sat: 6AM–10PM");
  const [logo, setLogo] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("gymName", gymName);
      formData.append("branch", branch);
      formData.append("supportEmail", supportEmail);
      formData.append("phone", phone);
      formData.append("gst", gst);
      formData.append("hours", hours);

      if (logo) formData.append("logo", logo);

      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/settings`, {
        // ✅ FIXED
        method: "POST",
        headers: token
          ? {
              Authorization: `Bearer ${token}`, // ✅ keep admin auth
            }
          : {},
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      alert("Settings saved successfully 🎯");
    } catch (error) {
      console.error("SAVE SETTINGS ERROR:", error);
      alert("Failed to save settings ❌");
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
          ADMIN / SETTINGS
        </p>
        <h2 className="text-4xl font-extrabold mt-3">
          Gym Configuration
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl">
          Update gym details, contact information and branding used across FitTrack.
        </p>
      </div>

      {/* MAIN WRAP */}
      <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* visuals */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-20 -left-24 w-[380px] h-[380px] bg-green-400/10 blur-[140px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] bg-emerald-300/10 blur-[150px] rounded-full" />
        </div>

        {/* CONTENT */}
        <div className="relative p-8 space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-6">
              <Field label="Gym Name">
                <input
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="Branch">
                <input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="Hours">
                <input
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="GST">
                <input
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <Field label="Support Email">
                <input
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="Phone">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                />
              </Field>

              {/* LOGO */}
              <input type="file" onChange={(e) => setLogo(e.target.files[0])} />

              <button
                onClick={handleSave}
                className="w-full px-8 py-3.5 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_25px_rgba(34,197,94,0.55)] hover:scale-[1.02] transition-all duration-300"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}