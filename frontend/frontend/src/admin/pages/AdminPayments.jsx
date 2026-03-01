import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../adminApi"; // ✅ FIXED

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await adminApi.get("/payments/all"); // ✅ FIXED

        if (!res.data?.success) {
          setErr(res.data?.message || "Failed to load payments");
          setPayments([]);
          return;
        }

        setPayments(res.data.payments || []);
      } catch (e) {
        console.error(e);
        setErr("Network / server error");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const total = useMemo(
    () => payments.reduce((sum, p) => sum + Number(p.amount || 0), 0),
    [payments]
  );

  const formatINR = (n) => Number(n || 0).toLocaleString("en-IN");

  const formatDateTime = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleString();
    } catch {
      return "—";
    }
  };

  const escapeHtml = (str) => {
    const s = String(str ?? "");
    return s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  };

  // ===== Receipt Generator (UNCHANGED LOGIC) =====
  const downloadReceipt = (p) => {
    try {
      setDownloadingId(p?._id || "x");

      const statusText = String(p?.status || "").toUpperCase() || "—";
      const txn = p?.transactionId || "—";
      const plan = p?.plan || "—";
      const amount = `₹${formatINR(p?.amount)}`;
      const method = p?.method || "—";
      const date = formatDateTime(p?.createdAt);

      const name = p?.userName || "—";
      const email = p?.userEmail || "—";
      const userId = p?.userId || "—";

      const receiptNo = txn !== "—" ? txn : p?._id || "—";

      const w = window.open("", "_blank", "width=900,height=650");
      if (!w) {
        alert("Popup blocked. Please allow popups.");
        setDownloadingId(null);
        return;
      }

      w.document.open();
      w.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>FitTrack Receipt</title>
          </head>
          <body>
            <h2>FitTrack Payment Receipt</h2>
            <p><b>Member:</b> ${escapeHtml(name)}</p>
            <p><b>Email:</b> ${escapeHtml(email)}</p>
            <p><b>Plan:</b> ${escapeHtml(plan)}</p>
            <p><b>Amount:</b> ${escapeHtml(amount)}</p>
            <p><b>Status:</b> ${escapeHtml(statusText)}</p>
            <p><b>Date:</b> ${escapeHtml(date)}</p>
            <p><b>Transaction:</b> ${escapeHtml(receiptNo)}</p>
            <script>setTimeout(() => window.print(), 250)</script>
          </body>
        </html>
      `);
      w.document.close();
    } catch (e) {
      console.error(e);
      alert("Failed to generate receipt.");
    } finally {
      setTimeout(() => setDownloadingId(null), 600);
    }
  };

  // ===== UI (UNCHANGED) =====
  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">Payment History</h2>

      {err && <div className="text-red-400">{err}</div>}

      <div>Total Collected: ₹{formatINR(total)}</div>

      <table className="w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Receipt</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.userName}</td>
              <td>{p.plan}</td>
              <td>₹{formatINR(p.amount)}</td>
              <td>{p.status}</td>
              <td>{formatDateTime(p.createdAt)}</td>
              <td>
                <button onClick={() => downloadReceipt(p)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}