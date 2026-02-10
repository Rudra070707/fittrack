import { useState } from "react";
import axios from "axios";

export default function EditPlanModal({ plan, onClose, onUpdated }) {

  const [name, setName] = useState(plan.name);
  const [price, setPrice] = useState(plan.price);
  const [description, setDescription] = useState(plan.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/plans/${plan._id}`, {
        name,
        price,
        description
      });

      alert("Plan Updated Successfully ✅");
      onUpdated();   // refresh plans
      onClose();     // close modal

    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="relative bg-gray-900 border border-white/10 shadow-2xl rounded-2xl w-96 p-6">

        {/* subtle glow */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-400/20 blur-3xl rounded-full" />

        <h3 className="text-2xl font-extrabold mb-1">Edit Plan</h3>
        <p className="text-gray-400 text-sm mb-5">
          Update plan details and pricing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">
              Plan Name
            </label>
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 
                         focus:ring-2 focus:ring-green-400 outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">
              Price (₹ per month)
            </label>
            <input
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 
                         focus:ring-2 focus:ring-green-400 outline-none"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 
                         focus:ring-2 focus:ring-green-400 outline-none resize-none"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 
                         hover:bg-white/15 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-green-500 text-black font-semibold
                         hover:bg-green-600 transition
                         shadow-[0_0_20px_rgba(34,197,94,0.45)]"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
