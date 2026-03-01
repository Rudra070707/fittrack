import { useState, useEffect, useMemo } from "react";
import { adminResetUserPassword } from "../../api";
import { adminApi } from "../adminApi"; // ✅ use your axios instance with token

export default function Users() {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    planCode: "",
  });

  // ✅ Show temp password after adding member
  const [createdCreds, setCreatedCreds] = useState(null); // { email, tempPassword, planName }
  const [copied, setCopied] = useState(false);

  // ✅ NEW: Reset password creds (inside edit modal)
  const [resetCreds, setResetCreds] = useState(null); // { tempPassword }
  const [resetCopied, setResetCopied] = useState(false);

  const planNameByCode = useMemo(() => {
    const map = {};
    for (const p of plans) map[p.code] = p.name;
    return map;
  }, [plans]);

  const fetchUsers = () => {
    adminApi
      .get("/users/all") // ✅ was localhost
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  };

  const fetchPlans = () => {
    adminApi
      .get("/plans/all") // ✅ was localhost
      .then((res) => setPlans(res.data.plans))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
    fetchPlans();
  }, []);

  // ✅ if plans load and planCode is empty, auto-select first plan code (optional)
  useEffect(() => {
    if (!newUser.planCode && plans.length > 0 && plans[0]?.code) {
      setNewUser((prev) => ({ ...prev, planCode: plans[0].code }));
    }
    // eslint-disable-next-line
  }, [plans]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    try {
      await adminApi.delete(`/users/${id}`); // ✅ was localhost
      fetchUsers();
    } catch {
      alert("Error deleting user");
    }
  };

  const openEdit = (user) => {
    // reset reset-password UI each time modal opens
    setResetCreds(null);
    setResetCopied(false);

    // user.plan stored as plan NAME in DB (ex: "Premium Plan")
    const matched = plans.find((p) => p.name === user.plan);
    setEditUser({
      ...user,
      planCode: matched?.code || "",
    });
  };

  const updateUser = async () => {
    try {
      const payload = {
        name: editUser.name,
        email: editUser.email,
        planCode: editUser.planCode || "",
      };

      await adminApi.put(`/users/${editUser._id}`, payload); // ✅ was localhost

      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  // ✅ Copy temp password (after add)
  const copyTempPassword = async () => {
    if (!createdCreds?.tempPassword) return;

    try {
      await navigator.clipboard.writeText(createdCreds.tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Name & Email required");
      return;
    }

    const payload = {
      name: newUser.name,
      email: newUser.email,
      planCode: newUser.planCode || "",
    };

    try {
      const res = await adminApi.post("/users/add", payload); // ✅ was localhost

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      setCreatedCreds({
        email: res.data.user?.email || payload.email,
        tempPassword: res.data.tempPassword || "",
        planName:
          res.data.user?.plan ||
          (payload.planCode ? planNameByCode[payload.planCode] : "No Plan"),
      });
      setCopied(false);

      setNewUser({ name: "", email: "", planCode: plans[0]?.code || "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to add user");
    }
  };

  // ✅ NEW: Reset Password (Admin) + Copy
  const resetPassword = async () => {
    if (!editUser?._id) return;

    if (!window.confirm("Reset password for this member?")) return;

    const res = await adminResetUserPassword(editUser._id);

    if (!res.success) {
      alert(res.message || "Reset failed");
      return;
    }

    setResetCreds({ tempPassword: res.tempPassword });
    setResetCopied(false);
  };

  const copyResetPassword = async () => {
    if (!resetCreds?.tempPassword) return;

    try {
      await navigator.clipboard.writeText(resetCreds.tempPassword);
      setResetCopied(true);
      setTimeout(() => setResetCopied(false), 1500);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
            ADMIN / USERS
          </p>
          <h2 className="text-4xl font-extrabold mt-3 leading-tight">
            Members Management
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl">
            Add, update and manage gym members easily — keep memberships organized
            and up to date.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <span className="text-xs text-gray-400">Total Members</span>
            <div className="text-xl font-extrabold text-white leading-tight mt-1">
              {users.length}
            </div>
          </div>
        </div>
      </div>

      {/* ADD USER FORM */}
      <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-green-400/10 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 bg-emerald-400/10 blur-[140px] rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl font-bold">Add New Member</h3>
            <p className="text-gray-400 text-sm mt-1">
              Create a member profile and optionally assign a membership plan.
            </p>
          </div>

          <button
            onClick={addUser}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_26px_rgba(34,197,94,0.45)] hover:scale-[1.03] transition-all duration-300"
          >
            Add Member
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Full Name
            </label>
            <input
              className="w-full p-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition"
              placeholder="e.g. Rudra Bandekar"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Email Address
            </label>
            <input
              className="w-full p-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition"
              placeholder="e.g. rudra@email.com"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Membership Plan
            </label>

            <select
              className="w-full p-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition"
              value={newUser.planCode}
              onChange={(e) =>
                setNewUser({ ...newUser, planCode: e.target.value })
              }
            >
              <option value="">No Plan</option>
              {plans.map((plan) => (
                <option key={plan._id} value={plan.code}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ TEMP PASSWORD CARD (after add member) */}
        {createdCreds?.tempPassword && (
          <div className="mt-6 rounded-3xl border border-green-400/20 bg-green-400/10 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-green-300">
                  Temporary Login Password
                </p>

                <p className="text-gray-300 text-sm mt-2">
                  Share this with the member for first login. (Password is shown
                  only once)
                </p>

                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gray-400">
                      Email
                    </div>
                    <div className="text-sm font-semibold text-white mt-1 break-all">
                      {createdCreds.email}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/30 border border-white/10 p-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gray-400">
                      Plan
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {createdCreds.planName || "No Plan"}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/30 border border-white/10 p-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gray-400">
                      Password
                    </div>
                    <div className="text-lg font-extrabold text-green-200 mt-1 tracking-widest">
                      {createdCreds.tempPassword}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:min-w-[200px]">
                <button
                  onClick={copyTempPassword}
                  className="px-5 py-3 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_22px_rgba(34,197,94,0.45)] hover:scale-[1.03] transition-all duration-300"
                >
                  {copied ? "Copied ✅" : "Copy Password"}
                </button>

                <button
                  onClick={() => setCreatedCreds(null)}
                  className="px-5 py-3 rounded-2xl bg-white/[0.06] border border-white/10 text-gray-200 font-semibold hover:bg-white/[0.09] transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* USERS TABLE */}
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h3 className="text-lg font-bold">All Members</h3>
            <p className="text-gray-400 text-sm mt-1">
              View and manage member details.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="px-3 py-2 rounded-2xl bg-black/20 border border-white/10">
              Showing:{" "}
              <span className="text-white font-semibold">{users.length}</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.03]">
              <tr className="text-left text-xs uppercase tracking-[0.22em] text-gray-400">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-gray-400"
                    colSpan="4"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-white/10 hover:bg-white/[0.03] transition"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-gray-500 mt-1">Member</div>
                  </td>

                  <td className="px-6 py-4 text-gray-300">{user.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-sm font-semibold ${
                        user.plan
                          ? "bg-green-400/10 border-green-400/25 text-green-300"
                          : "bg-white/[0.03] border-white/10 text-gray-300"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          user.plan
                            ? "bg-green-400 shadow-[0_0_14px_rgba(34,197,94,0.6)]"
                            : "bg-gray-500"
                        }`}
                      />
                      {user.plan || "No Plan"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="px-4 py-2 rounded-2xl bg-blue-500/20 border border-blue-400/20 text-blue-200 font-semibold hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-4 py-2 rounded-2xl bg-red-500/20 border border-red-400/20 text-red-200 font-semibold hover:bg-red-500/30 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-green-400/10 blur-[120px] rounded-full" />

            <div className="px-6 py-5 border-b border-white/10 bg-white/[0.02]">
              <h3 className="text-xl font-bold">Edit Member</h3>
              <p className="text-gray-400 text-sm mt-1">
                Update name, email and plan for this user.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Name
                </label>
                <input
                  className="w-full p-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  placeholder="Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Email
                </label>
                <input
                  className="w-full p-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.22em] text-gray-400">
                  Membership Plan
                </label>

                <select
                  className="w-full p-3 rounded-2xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400 outline-none transition"
                  value={editUser.planCode || ""}
                  onChange={(e) =>
                    setEditUser({ ...editUser, planCode: e.target.value })
                  }
                >
                  <option value="">No Plan</option>
                  {plans.map((plan) => (
                    <option key={plan._id} value={plan.code}>
                      {plan.name}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-500">
                  Will save as:{" "}
                  <span className="text-gray-300 font-semibold">
                    {editUser.planCode
                      ? planNameByCode[editUser.planCode]
                      : "No Plan"}
                  </span>
                </p>
              </div>

              {/* ✅ NEW: Reset Password Card */}
              {resetCreds?.tempPassword && (
                <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-yellow-200">
                    New Temporary Password
                  </div>
                  <div className="mt-2 text-lg font-extrabold tracking-widest text-yellow-100">
                    {resetCreds.tempPassword}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={copyResetPassword}
                      className="px-4 py-2 rounded-2xl bg-yellow-400 text-black font-semibold hover:scale-[1.02] transition"
                    >
                      {resetCopied ? "Copied ✅" : "Copy"}
                    </button>

                    <button
                      onClick={() => setResetCreds(null)}
                      className="px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/10 text-gray-200 font-semibold hover:bg-white/[0.09] transition"
                    >
                      Dismiss
                    </button>
                  </div>

                  <p className="text-xs text-gray-300 mt-3">
                    Member will be forced to change password on next login.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                {/* ✅ NEW: Reset Password Button */}
                <button
                  onClick={resetPassword}
                  className="px-4 py-2 rounded-2xl bg-yellow-500/20 border border-yellow-400/20 text-yellow-200 font-semibold hover:bg-yellow-500/30 transition"
                >
                  Reset Password
                </button>

                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/10 text-gray-200 font-semibold hover:bg-white/[0.09] transition"
                >
                  Cancel
                </button>

                <button
                  onClick={updateUser}
                  className="px-5 py-2 rounded-2xl bg-green-400 text-black font-semibold shadow-[0_0_22px_rgba(34,197,94,0.45)] hover:scale-[1.03] transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}