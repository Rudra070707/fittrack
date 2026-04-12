import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentModal({
  open,
  onClose,
  onSuccess,
  amount,
  planName,
}) {

  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState("form");

  const [upiId, setUpiId] = useState("");

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [bank, setBank] = useState("SBI");

  const txnId = useMemo(
    () => `FTX${Math.floor(100000 + Math.random() * 900000)}`,
    [open]
  );

  useEffect(() => {

    if (!open) return;

    setMethod("upi");
    setProcessing(false);
    setStep("form");
    setUpiId("");
    setCard({ number: "", name: "", expiry: "", cvv: "" });
    setBank("SBI");

  }, [open]);

  if (!open) return null;

  const validate = () => {

    if (method === "upi" && (!upiId || !upiId.includes("@"))) {
      return "Enter a valid UPI ID";
    }

    if (method === "card") {

      if (card.number.replace(/\s/g, "").length < 12) {
        return "Invalid card number";
      }

      if (!card.name) return "Card holder required";

      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
        return "Expiry must be MM/YY";
      }

      if (card.cvv.length < 3) return "Invalid CVV";
    }

    return null;
  };

  const payNow = async () => {

    const err = validate();
    if (err) return alert(err);

    setProcessing(true);
    setStep("processing");

    await new Promise((r) => setTimeout(r, 1800));

    setStep("success");
    setProcessing(false);

    await new Promise((r) => setTimeout(r, 1200));

    onSuccess?.({
      txnId,
      method,
      amount,
      planName,
    });

    onClose?.();

  };

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          {/* 🔥 BACKDROP */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
            onClick={() => !processing && onClose()}
          />

          {/* 🔥 BACKGROUND GLOW */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[500px] h-[500px] bg-green-400/10 blur-[180px] top-[-100px] left-[-100px]" />
            <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[180px] bottom-[-100px] right-[-100px]" />
          </div>

          {/* modal */}
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
            relative w-full max-w-lg
            rounded-3xl
            backdrop-blur-2xl
            bg-gradient-to-b from-[#0b0f14]/95 to-[#020617]/95
            border border-white/10
            shadow-[0_40px_120px_rgba(0,0,0,0.9)]
            overflow-hidden
            "
          >

            {/* 🔥 HEADER */}
            <div className="px-6 py-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-black flex justify-between items-center">

              <div>
                <p className="text-lg font-bold tracking-wide">
                  Complete Your Payment
                </p>

                <p className="text-xs opacity-80">
                  Transaction ID: {txnId}
                </p>
              </div>

              {step === "form" && (
                <button
                  onClick={onClose}
                  className="text-xs bg-black/20 px-3 py-1 rounded-full hover:bg-black/30 transition"
                >
                  Close
                </button>
              )}

            </div>

            {/* 🔥 BODY */}
            <div className="p-6">

              {step === "form" && (
                <>

                  {/* 🔥 PLAN INFO */}
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <p className="text-white font-semibold">{planName}</p>
                    <p className="text-green-400 font-bold text-2xl mt-1 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">
                      ₹{amount}
                    </p>
                  </div>

                  {/* method selector */}
                  <div className="flex gap-2 mb-5">

                    {["upi", "card", "netbanking"].map((m) => (

                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`
                        flex-1 py-2 rounded-xl text-sm border transition-all duration-300
                        ${
                          method === m
                            ? "bg-green-400 text-black border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.7)] scale-[1.04]"
                            : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                        }
                        `}
                      >
                        {m.toUpperCase()}
                      </button>

                    ))}

                  </div>

                  {/* UPI */}
                  {method === "upi" && (
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="name@upi"
                      className="
                      w-full bg-black/40
                      px-4 py-3 rounded-xl
                      border border-white/10
                      text-white
                      focus:ring-2 focus:ring-green-400
                      outline-none
                      transition-all duration-300
                      focus:shadow-[0_0_25px_rgba(34,197,94,0.5)]
                      "
                    />
                  )}

                  {/* Card */}
                  {method === "card" && (
                    <div className="space-y-3">

                      <input
                        placeholder="Card Number"
                        className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                        value={card.number}
                        onChange={(e) =>
                          setCard({ ...card, number: e.target.value })
                        }
                      />

                      <input
                        placeholder="Name on Card"
                        className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-green-400 focus:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                        value={card.name}
                        onChange={(e) =>
                          setCard({ ...card, name: e.target.value })
                        }
                      />

                      <div className="flex gap-3">

                        <input
                          placeholder="MM/YY"
                          className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-green-400"
                          value={card.expiry}
                          onChange={(e) =>
                            setCard({ ...card, expiry: e.target.value })
                          }
                        />

                        <input
                          placeholder="CVV"
                          className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-green-400"
                          value={card.cvv}
                          onChange={(e) =>
                            setCard({ ...card, cvv: e.target.value })
                          }
                        />

                      </div>

                    </div>
                  )}

                  {/* Netbanking */}
                  {method === "netbanking" && (
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full bg-black/40 px-4 py-3 rounded-xl text-white border border-white/10 focus:ring-2 focus:ring-green-400"
                    >
                      <option>SBI</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                      <option>AXIS</option>
                    </select>
                  )}

                  {/* 🔥 TRUST BADGE */}
                  <p className="text-xs text-white/50 mt-4 text-center">
                    🔒 Secure payment • Encrypted • Trusted by users
                  </p>

                  {/* Pay button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={payNow}
                    className="
                    mt-6 w-full py-3 rounded-2xl
                    bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
                    text-black font-bold tracking-wide
                    shadow-[0_0_50px_rgba(34,197,94,0.8)]
                    hover:shadow-[0_0_80px_rgba(34,197,94,1)]
                    transition-all duration-300
                    relative overflow-hidden
                    "
                  >
                    {/* 🔥 SHINE */}
                    <span className="absolute inset-0 overflow-hidden">
                      <span className="absolute w-1/2 h-full bg-white/20 blur-lg -left-1/2 animate-[shine_2s_infinite]" />
                    </span>

                    <span className="relative z-10">
                      🔒 Pay ₹{amount}
                    </span>
                  </motion.button>

                </>
              )}

              {/* processing */}
              {step === "processing" && (
                <div className="text-center py-12">

                  <div className="mx-auto w-12 h-12 border-4 border-white/10 border-t-green-400 rounded-full animate-spin shadow-[0_0_25px_rgba(34,197,94,0.7)]" />

                  <p className="mt-4 text-white">
                    Processing payment...
                  </p>

                </div>
              )}

              {/* success */}
              {step === "success" && (
                <div className="text-center py-12">

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center text-green-300 text-3xl shadow-[0_0_30px_rgba(34,197,94,0.8)]"
                  >
                    ✓
                  </motion.div>

                  <p className="text-white text-xl font-bold mt-4">
                    Payment Successful
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    Your subscription has been activated successfully.
                  </p>

                </div>
              )}

            </div>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
}