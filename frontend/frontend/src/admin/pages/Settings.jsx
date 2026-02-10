import { useState } from "react";

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

      if (logo) {
        formData.append("logo", logo);
      }

      const res = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

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
      <div
        className="
          relative
          bg-white/[0.04] backdrop-blur-xl
          border border-white/10
          rounded-3xl
          shadow-[0_30px_80px_rgba(0,0,0,0.7)]
          overflow-hidden
        "
      >
        {/* soft background visuals */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-20 -left-24 w-[380px] h-[380px] bg-green-400/10 blur-[140px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] bg-emerald-300/10 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px]" />
        </div>

        {/* TOP BAR */}
        <div className="relative px-8 py-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-xl font-bold">Brand & Contact Settings</h3>
              <p className="text-gray-400 text-sm mt-1">
                These values appear on user pages, receipts, and support contact screens.
              </p>
            </div>

            {/* quick status pill (visual only) */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.6)]" />
              <span className="text-xs text-gray-300 px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
                Settings Ready
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-8 space-y-8">

          {/* PREVIEW STRIP (NO LOGIC CHANGE) */}
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-6
              shadow-[0_18px_55px_rgba(0,0,0,0.45)]
            "
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Current Branding
                </p>
                <h4 className="text-2xl font-extrabold mt-2">
                  {gymName || "FitTrack Fitness Club"}
                </h4>
                <p className="text-gray-400 mt-1 text-sm">
                  {branch || "Branch location"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                  <span className="text-green-300 font-bold">FT</span>
                </div>
                <div className="text-sm text-gray-300">
                  <p className="font-semibold">{supportEmail}</p>
                  <p className="text-gray-400">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* LEFT: DETAILS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Gym Details
                </p>
                <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Gym Name">
                  <input
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                    className="
                      w-full p-3.5 rounded-2xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-green-400 outline-none
                      transition
                    "
                  />
                </Field>

                <Field label="Branch Location">
                  <input
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="
                      w-full p-3.5 rounded-2xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-green-400 outline-none
                      transition
                    "
                  />
                </Field>

                <Field label="Opening Hours">
                  <input
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="
                      w-full p-3.5 rounded-2xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-green-400 outline-none
                      transition
                    "
                  />
                </Field>

                <Field label="GST Number">
                  <input
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                    className="
                      w-full p-3.5 rounded-2xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-green-400 outline-none
                      transition
                    "
                  />
                </Field>
              </div>
            </div>

            {/* RIGHT: CONTACT + LOGO */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Contact & Branding
                </p>
                <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Support Email">
                  <input
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="
                      w-full p-3.5 rounded-2xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-green-400 outline-none
                      transition
                    "
                  />
                </Field>

                <Field label="Contact Number">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="
                      w-full p-3.5 rounded-2xl
                      bg-black/30 border border-white/10
                      focus:ring-2 focus:ring-green-400 outline-none
                      transition
                    "
                  />
                </Field>
              </div>

              {/* LOGO UPLOAD */}
              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >
                <p className="text-sm font-semibold text-white">
                  Gym Logo (optional)
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Recommended: transparent PNG, square ratio (512×512).
                </p>

                <label
                  className="
                    mt-4
                    flex items-center justify-between gap-4
                    rounded-2xl
                    border border-white/10
                    bg-black/25
                    px-4 py-3
                    cursor-pointer
                    hover:bg-black/35
                    transition
                  "
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                      <span className="text-green-300 font-bold">⬆</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-200 font-medium truncate">
                        {logo ? logo.name : "Choose a file to upload"}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG/JPG supported
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-gray-300 px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    Browse
                  </span>

                  <input
                    type="file"
                    onChange={(e) => setLogo(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              {/* SAVE BUTTON */}
              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="
                    w-full
                    px-8 py-3.5 rounded-2xl
                    bg-green-400 text-black font-semibold
                    shadow-[0_0_25px_rgba(34,197,94,0.55)]
                    hover:scale-[1.02]
                    transition-all duration-300
                  "
                >
                  Save Settings
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Tip: Save settings after logo upload so it reflects on both User and Admin header/sidebars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small helper component for consistent spacing (visual only) */
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
