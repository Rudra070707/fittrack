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
        method: "POST",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
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

  const inputClass =
    "w-full p-3.5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-green-400/40 focus:border-green-400/30";

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
          ADMIN / SETTINGS
        </p>
        <h2 className="text-4xl font-extrabold mt-3">Gym Configuration</h2>
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />
        </div>

        {/* CONTENT */}
        <div className="relative p-8 space-y-8">
          {/* PREVIEW STRIP */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Current Branding Preview
            </p>
            <h4 className="text-2xl font-extrabold mt-2">{gymName}</h4>
            <p className="text-gray-400 mt-1">{branch}</p>
            <p className="text-gray-400 mt-2 text-sm">
              Support: <span className="text-gray-200 font-semibold">{supportEmail}</span>{" "}
              | <span className="text-gray-200 font-semibold">{phone}</span>
            </p>
          </div>

          {/* FORM GRID */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-6">
              <Field label="Gym Name">
                <input value={gymName} onChange={(e) => setGymName(e.target.value)} className={inputClass} />
              </Field>

              <Field label="Branch">
                <input value={branch} onChange={(e) => setBranch(e.target.value)} className={inputClass} />
              </Field>

              <Field label="Hours">
                <input value={hours} onChange={(e) => setHours(e.target.value)} className={inputClass} />
              </Field>

              <Field label="GST">
                <input value={gst} onChange={(e) => setGst(e.target.value)} className={inputClass} />
              </Field>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <Field label="Support Email">
                <input
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Phone">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </Field>

              {/* LOGO */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-semibold text-white">Gym Logo (optional)</p>
                <p className="text-gray-400 text-sm mt-1">
                  Recommended: transparent PNG, square ratio (512×512).
                </p>

                <label className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 cursor-pointer hover:bg-black/35 transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                      <span className="text-green-300 font-bold">⬆</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-200 font-medium truncate">
                        {logo ? logo.name : "Choose a file to upload"}
                      </p>
                      <p className="text-xs text-gray-500">PNG/JPG supported</p>
                    </div>
                  </div>

                  <span className="text-xs text-gray-300 px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    Browse
                  </span>

                  <input type="file" onChange={(e) => setLogo(e.target.files[0])} className="hidden" />
                </label>
              </div>

              {/* SAVE */}
              <button
                onClick={handleSave}
                className="w-full px-8 py-3.5 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_25px_rgba(34,197,94,0.55)] hover:scale-[1.02] transition-all duration-300"
              >
                Save Settings
              </button>

              <p className="text-xs text-gray-500">
                Tip: Save settings after logo upload so it reflects in admin branding.
              </p>
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