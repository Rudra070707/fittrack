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

          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => !processing && onClose()}
          />

          {/* modal */}
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
            relative w-full max-w-lg
            rounded-3xl
            backdrop-blur-2xl
            bg-[#0b0f14]/95
            border border-white/10
            shadow-[0_30px_90px_rgba(0,0,0,0.8)]
            overflow-hidden
            "
          >

            {/* header */}
            <div className="px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black flex justify-between items-center">

              <div>
                <p className="text-lg font-bold">
                  Complete Your Payment
                </p>

                <p className="text-xs opacity-80">
                  Transaction ID: {txnId}
                </p>
              </div>

              {step === "form" && (
                <button
                  onClick={onClose}
                  className="text-xs bg-black/20 px-3 py-1 rounded-full hover:bg-black/30"
                >
                  Close
                </button>
              )}

            </div>

            {/* body */}
            <div className="p-6">

              {step === "form" && (
                <>

                  <p className="text-white font-semibold mb-1">
                    {planName}
                  </p>

                  <p className="text-green-400 font-bold text-lg mb-5">
                    ₹{amount}
                  </p>

                  {/* method selector */}
                  <div className="flex gap-2 mb-5">

                    {["upi", "card", "netbanking"].map((m) => (

                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`
                        flex-1 py-2 rounded-xl text-sm border transition
                        ${
                          method === m
                            ? "bg-green-400 text-black border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
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
                      "
                    />
                  )}

                  {/* Card */}
                  {method === "card" && (
                    <div className="space-y-3">

                      <input
                        placeholder="Card Number"
                        className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10"
                        value={card.number}
                        onChange={(e) =>
                          setCard({ ...card, number: e.target.value })
                        }
                      />

                      <input
                        placeholder="Name on Card"
                        className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10"
                        value={card.name}
                        onChange={(e) =>
                          setCard({ ...card, name: e.target.value })
                        }
                      />

                      <div className="flex gap-3">

                        <input
                          placeholder="MM/YY"
                          className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10"
                          value={card.expiry}
                          onChange={(e) =>
                            setCard({ ...card, expiry: e.target.value })
                          }
                        />

                        <input
                          placeholder="CVV"
                          className="w-full bg-black/40 px-4 py-3 rounded-xl border border-white/10"
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
                      className="w-full bg-black/40 px-4 py-3 rounded-xl text-white border border-white/10"
                    >
                      <option>SBI</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                      <option>AXIS</option>
                    </select>
                  )}

                  {/* Pay button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={payNow}
                    className="
                    mt-6 w-full py-3 rounded-2xl
                    bg-gradient-to-r from-green-400 to-emerald-500
                    text-black font-bold
                    shadow-[0_0_30px_rgba(34,197,94,0.5)]
                    "
                  >
                    Pay ₹{amount}
                  </motion.button>

                </>
              )}

              {/* processing */}
              {step === "processing" && (
                <div className="text-center py-12">

                  <div className="mx-auto w-12 h-12 border-4 border-white/10 border-t-green-400 rounded-full animate-spin" />

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
                    className="mx-auto w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center text-green-300 text-3xl"
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