import { useEffect, useMemo, useState } from "react";
import { API_BASE, authHeader } from "../../api";

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

        const res = await fetch(`${API_BASE}/payments/all`, {
          headers: authHeader(),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.success) {
          setErr(data?.message || "Failed to load payments");
          setPayments([]);
          return;
        }

        setPayments(data.payments || []);
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

  // ✅ Receipt (Print → Save as PDF)
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
        alert("Popup blocked. Please allow popups to download receipt.");
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
            <style>
              * { box-sizing: border-box; }
              body {
                font-family: Arial, Helvetica, sans-serif;
                margin: 0;
                padding: 28px;
                background: #0b0f14;
                color: #e5e7eb;
              }
              .wrap {
                max-width: 860px;
                margin: 0 auto;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.10);
                border-radius: 18px;
                overflow: hidden;
              }
              .top {
                padding: 22px 26px;
                border-bottom: 1px solid rgba(255,255,255,0.10);
                background: rgba(255,255,255,0.03);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
              }
              .brand {
                font-size: 20px;
                font-weight: 800;
                letter-spacing: 0.04em;
              }
              .brand span { color: #22c55e; }
              .meta {
                text-align: right;
                font-size: 12px;
                color: #9ca3af;
                line-height: 1.6;
              }
              .content { padding: 22px 26px 10px; }
              .title {
                font-size: 22px;
                font-weight: 900;
                margin: 0 0 6px;
              }
              .subtitle {
                margin: 0 0 18px;
                color: #9ca3af;
                font-size: 13px;
              }
              .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-bottom: 16px;
              }
              .card {
                padding: 14px 14px;
                border-radius: 14px;
                border: 1px solid rgba(255,255,255,0.10);
                background: rgba(0,0,0,0.25);
              }
              .label {
                font-size: 10px;
                letter-spacing: 0.18em;
                text-transform: uppercase;
                color: #9ca3af;
                margin-bottom: 8px;
              }
              .value {
                font-size: 14px;
                font-weight: 700;
                color: #f3f4f6;
                word-break: break-word;
              }
              .amount {
                font-size: 20px;
                font-weight: 900;
                color: #22c55e;
              }
              .status {
                display: inline-block;
                padding: 6px 10px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 800;
                border: 1px solid rgba(34,197,94,0.28);
                background: rgba(34,197,94,0.12);
                color: #86efac;
              }
              .status.fail {
                border-color: rgba(248,113,113,0.28);
                background: rgba(248,113,113,0.12);
                color: #fecaca;
              }
              .footer {
                padding: 14px 26px 22px;
                border-top: 1px solid rgba(255,255,255,0.10);
                color: #9ca3af;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                gap: 12px;
                flex-wrap: wrap;
              }
              .note {
                margin: 0;
                max-width: 520px;
                line-height: 1.6;
              }
              .small {
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                font-size: 12px;
              }

              @media print {
                body { background: #fff; color: #111827; padding: 0; }
                .wrap { border: 1px solid #e5e7eb; background: #fff; border-radius: 0; }
                .top { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
                .card { background: #fff; border: 1px solid #e5e7eb; }
                .brand span { color: #16a34a; }
                .amount { color: #16a34a; }
                .status { border-color: #bbf7d0; background: #dcfce7; color: #166534; }
                .status.fail { border-color: #fecaca; background: #fee2e2; color: #991b1b; }
                .footer { border-top: 1px solid #e5e7eb; }
              }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="top">
                <div class="brand">FitTrack<span>Admin</span></div>
                <div class="meta">
                  <div><strong>Receipt</strong></div>
                  <div>Date: ${date}</div>
                  <div class="small">Receipt No: ${escapeHtml(receiptNo)}</div>
                </div>
              </div>

              <div class="content">
                <h1 class="title">Payment Receipt</h1>
                <p class="subtitle">This receipt confirms a recorded subscription payment in FitTrack (Demo).</p>

                <div class="grid">
                  <div class="card">
                    <div class="label">Member Name</div>
                    <div class="value">${escapeHtml(name)}</div>
                  </div>
                  <div class="card">
                    <div class="label">Member Email</div>
                    <div class="value">${escapeHtml(email)}</div>
                  </div>

                  <div class="card">
                    <div class="label">Member ID</div>
                    <div class="value small">${escapeHtml(userId)}</div>
                  </div>
                  <div class="card">
                    <div class="label">Transaction ID</div>
                    <div class="value small">${escapeHtml(txn)}</div>
                  </div>

                  <div class="card">
                    <div class="label">Plan</div>
                    <div class="value">${escapeHtml(plan)}</div>
                  </div>
                  <div class="card">
                    <div class="label">Payment Method</div>
                    <div class="value">${escapeHtml(method)}</div>
                  </div>

                  <div class="card">
                    <div class="label">Amount</div>
                    <div class="value amount">${escapeHtml(amount)}</div>
                  </div>
                  <div class="card">
                    <div class="label">Status</div>
                    <div class="value">
                      <span class="status ${statusText === "FAILED" ? "fail" : ""}">
                        ${escapeHtml(statusText)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <p class="note">
                  This is a demo receipt generated by FitTrack Admin Panel. For project documentation, attach this PDF as proof of recorded payment flow.
                </p>
                <div class="small">© ${new Date().getFullYear()} FitTrack</div>
              </div>
            </div>

            <script>
              setTimeout(() => window.print(), 250);
            </script>
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

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-green-400 font-semibold tracking-[0.25em] text-xs">
            ADMIN / PAYMENTS
          </p>

          <h2 className="text-4xl font-extrabold mt-3 leading-tight">
            Payment <span className="text-green-400">History</span>
          </h2>

          <p className="text-gray-400 mt-3 max-w-2xl">
            View all recorded subscription payments and transaction details.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative px-5 py-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-green-400/10 blur-[110px] rounded-full" />
            <div className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Total Collected
            </div>
            <div className="text-2xl font-extrabold text-green-300 mt-2">
              ₹{formatINR(total)}
            </div>
          </div>

          <div className="px-5 py-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="text-xs uppercase tracking-[0.22em] text-gray-400">
              Records
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">
              {loading ? "…" : payments.length}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-green-400/10 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 bg-emerald-400/10 blur-[140px] rounded-full" />

        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h3 className="text-lg font-bold">All Transactions</h3>
            <p className="text-gray-400 text-sm mt-1">
              Monitor payment details, status and timestamps.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="px-3 py-2 rounded-2xl bg-black/20 border border-white/10">
              {loading ? (
                <>Loading…</>
              ) : (
                <>
                  Showing:{" "}
                  <span className="text-white font-semibold">
                    {payments.length}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>

        {err && (
          <div className="px-6 py-5 text-red-300 bg-red-500/10 border-b border-red-500/20">
            {err}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px]">
            <thead className="bg-white/[0.03]">
              <tr className="text-left text-xs uppercase tracking-[0.22em] text-gray-400">
                <th className="px-6 py-4 font-semibold">Transaction</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Receipt</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td className="px-6 py-10 text-gray-300" colSpan={8}>
                    Loading payments...
                  </td>
                </tr>
              )}

              {!loading && !payments.length && !err && (
                <tr>
                  <td className="px-6 py-10 text-center text-gray-400" colSpan={8}>
                    No payments found
                  </td>
                </tr>
              )}

              {!loading &&
                payments.map((p) => {
                  const statusText = String(p.status || "").toUpperCase();
                  const isSuccess =
                    statusText.includes("SUCCESS") || statusText === "SUCCESS";

                  const badge = isSuccess
                    ? "bg-green-400/10 border-green-400/25 text-green-300"
                    : "bg-red-400/10 border-red-400/25 text-red-300";

                  const dot = isSuccess ? "bg-green-400" : "bg-red-400";
                  const txn = p.transactionId || "—";

                  const name = p.userName || "—";
                  const email = p.userEmail || "";
                  const fallbackId = p.userId || "—";

                  return (
                    <tr
                      key={p._id}
                      className="border-t border-white/10 hover:bg-white/[0.03] transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-mono text-sm text-gray-200 break-all">
                          {txn}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-white font-semibold leading-tight">
                          {name}
                        </div>
                        {email ? (
                          <div className="text-xs text-gray-400 mt-1 break-all">
                            {email}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500 mt-1 break-all">
                            {fallbackId}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-200">
                        {p.plan || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-extrabold text-white">
                          ₹{formatINR(p.amount)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {p.method || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-sm font-semibold ${badge}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${dot} ${
                              isSuccess
                                ? "shadow-[0_0_14px_rgba(34,197,94,0.6)]"
                                : "shadow-[0_0_14px_rgba(248,113,113,0.45)]"
                            }`}
                          />
                          {statusText || "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {formatDateTime(p.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => downloadReceipt(p)}
                          disabled={downloadingId === p._id}
                          className={`
                            px-4 py-2 rounded-2xl
                            border border-white/10
                            bg-white/[0.06]
                            text-gray-200 font-semibold
                            hover:bg-white/[0.09]
                            transition
                            ${
                              downloadingId === p._id
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                            }
                          `}
                        >
                          {downloadingId === p._id ? "Generating…" : "Download"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
