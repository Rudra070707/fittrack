import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { recordPayment } from "../api";

export default function DemoCheckout({
  planName,
  amount,
  userId,
  onSuccess,
  disabled = false,
}) {
  const [openPay, setOpenPay] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSuccess = async ({ txnId, method }) => {
    try {
      setSaving(true);

      // Save in DB (your existing backend route)
      await recordPayment({
        userId,
        amount,
        plan: planName,
        status: "success",
        txnId,
        method,
      });

      setOpenPay(false);
      onSuccess?.();
    } catch (e) {
      console.error(e);
      alert("Payment save failed. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  const openPayment = () => {
    if (disabled || saving) return;
    setOpenPay(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openPayment}
        disabled={disabled || saving}
        className="
          w-full mt-2 py-3.5 rounded-2xl
          bg-green-400 text-black font-bold
          shadow-[0_0_30px_rgba(34,197,94,0.55)]
          hover:bg-green-500
          transition
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {saving ? "Finalizing..." : `Pay Securely • ₹${amount}`}
      </button>

      <PaymentModal
        open={openPay}
        onClose={() => setOpenPay(false)}
        onSuccess={handleSuccess}
        amount={amount}
        planName={planName}
      />
    </>
  );
}
