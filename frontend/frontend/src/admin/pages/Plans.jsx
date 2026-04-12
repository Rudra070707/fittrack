import { useState, useEffect } from "react";
import { adminApi } from "../adminApi";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  // 🔹 for edit modal
  const [editingPlan, setEditingPlan] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const fetchPlans = async () => {
    try {
      const plansRes = await adminApi.get("/plans/all");
      setPlans(plansRes.data.plans || []);
      console.log("PLANS FETCHED:", plansRes.data.plans);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setName(plan.name || "");
    setPrice(plan.price ?? "");
    setDescription(plan.description || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Plan name is required");
    if (price === "" || Number.isNaN(Number(price))) return alert("Valid price is required");

    try {
      const res = await adminApi.put(`/plans/${editingPlan._id}`, {
        name: name.trim(),
        price: Number(price),
        description: (description || "").trim(),
      });

      if (!res.data?.success) {
        alert(res.data?.message || "Failed to update ❌");
        return;
      }

      alert("Plan updated successfully ✅");
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update ❌";
      alert(msg);
    }
  };

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
          ADMIN / PLANS
        </p>

        <h2 className="text-4xl font-extrabold mt-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Membership Plans
        </h2>

        <p className="text-gray-400 mt-3 max-w-2xl">
          Control pricing, descriptions and active members for each membership plan.
        </p>
      </div>

      {/* PLANS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const activeUsers = plan.userCount ?? 0;

          return (
            <div
              key={plan._id}
              className="
                relative
                bg-white/[0.04] backdrop-blur-2xl
                border border-white/10
                rounded-3xl
                p-7
                shadow-[0_30px_80px_rgba(0,0,0,0.75)]
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_0_60px_rgba(34,197,94,0.45)]
                overflow-hidden
              "
            >
              {/* glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-green-400/25 blur-[130px] rounded-full animate-pulse" />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />

              <h3 className="text-2xl font-extrabold tracking-tight">
                {plan.name}
              </h3>

              <p className="mt-3 text-3xl font-extrabold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                ₹{plan.price}
                <span className="text-sm text-gray-400 font-medium"> / month</span>
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span
                  className={`
                    inline-flex items-center gap-2
                    px-3 py-1.5 rounded-2xl
                    border
                    ${
                      activeUsers > 0
                        ? "bg-green-400/10 border-green-400/25 text-green-300"
                        : "bg-white/[0.03] border-white/10 text-gray-300"
                    }
                  `}
                >
                  <span
                    className={`
                      h-2 w-2 rounded-full
                      ${
                        activeUsers > 0
                          ? "bg-green-400 shadow-[0_0_16px_rgba(34,197,94,0.8)]"
                          : "bg-gray-500"
                      }
                    `}
                  />
                  {activeUsers} Active Users
                </span>
              </div>

              <button
                onClick={() => handleEdit(plan)}
                className="
                  mt-7 w-full
                  px-5 py-3 rounded-2xl
                  bg-blue-500/20 border border-blue-400/20
                  text-blue-200 font-semibold
                  hover:bg-blue-500/30
                  hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-300
                "
              >
                Edit Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-md bg-white/[0.06] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden">

            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-green-400/15 blur-[140px] rounded-full" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 bg-emerald-400/15 blur-[140px] rounded-full" />

            <div className="px-6 py-5 border-b border-white/10 bg-white/[0.03]">
              <h3 className="text-xl font-bold">Edit Membership Plan</h3>
              <p className="text-gray-400 text-sm mt-1">
                Update pricing and description for this plan.
              </p>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Plan Name
                </label>
                <input
                  className="w-full p-3 rounded-2xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Price (₹ / month)
                </label>
                <input
                  className="w-full p-3 rounded-2xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Description
                </label>
                <textarea
                  className="w-full p-3 rounded-2xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none resize-none transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="
                    px-4 py-2 rounded-2xl
                    bg-white/[0.06] border border-white/10
                    text-gray-200 font-semibold
                    hover:bg-white/[0.1]
                    transition-all
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-5 py-2 rounded-2xl
                    bg-green-400 text-black font-semibold
                    shadow-[0_0_25px_rgba(34,197,94,0.6)]
                    hover:scale-[1.04]
                    active:scale-[0.97]
                    transition-all duration-300
                  "
                >
                  Save Changes
                </button>
              </div>

            </form>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      )}

    </div>
  );
}