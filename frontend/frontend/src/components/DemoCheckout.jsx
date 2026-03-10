import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.button
        type="button"
        onClick={openPayment}
        disabled={disabled || saving}

        whileHover={!disabled && !saving ? { scale: 1.03 } : {}}
        whileTap={!disabled && !saving ? { scale: 0.97 } : {}}

        className="
          w-full mt-2 py-3.5 rounded-2xl
          bg-green-400 text-black font-bold
          shadow-[0_0_30px_rgba(34,197,94,0.55)]
          hover:bg-green-500
          transition
          disabled:opacity-60 disabled:cursor-not-allowed
          relative overflow-hidden
        "
      >
        {/* subtle glow animation */}
        {!saving && (
          <span className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
        )}

        <span className="relative">
          {saving ? "Finalizing..." : `Pay Securely • ₹${amount}`}
        </span>
      </motion.button>

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