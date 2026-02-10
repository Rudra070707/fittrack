import { useEffect, useMemo, useState } from "react";

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
    if (method === "upi" && (!upiId || !upiId.includes("@")))
      return "Enter a valid UPI ID";
    if (method === "card") {
      if (card.number.replace(/\s/g, "").length < 12)
        return "Invalid card number";
      if (!card.name) return "Card holder required";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry))
        return "Expiry must be MM/YY";
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !processing && onClose()}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-[#0b0f14] border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black flex justify-between">
          <div>
            <p className="text-lg font-bold">Complete Your Payment</p>
            <p className="text-xs opacity-80">Transaction ID: {txnId}</p>
          </div>

          {step === "form" && (
            <button
              onClick={onClose}
              className="text-xs bg-black/20 px-3 py-1 rounded-full"
            >
              Close
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {step === "form" && (
            <>
              <p className="text-white font-semibold mb-2">{planName}</p>
              <p className="text-green-300 font-bold mb-4">₹{amount}</p>

              <div className="flex gap-2 mb-4">
                {["upi", "card", "netbanking"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`px-3 py-2 rounded-xl text-sm border ${
                      method === m
                        ? "bg-green-400 text-black"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>

              {method === "upi" && (
                <input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@upi"
                  className="w-full bg-black/40 px-3 py-3 rounded-xl text-white"
                />
              )}

              {method === "card" && (
                <div className="space-y-3">
                  <input
                    placeholder="Card Number"
                    className="w-full bg-black/40 px-3 py-3 rounded-xl"
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                  />
                  <input
                    placeholder="Name on Card"
                    className="w-full bg-black/40 px-3 py-3 rounded-xl"
                    value={card.name}
                    onChange={(e) =>
                      setCard({ ...card, name: e.target.value })
                    }
                  />
                  <div className="flex gap-3">
                    <input
                      placeholder="MM/YY"
                      className="w-full bg-black/40 px-3 py-3 rounded-xl"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                    />
                    <input
                      placeholder="CVV"
                      className="w-full bg-black/40 px-3 py-3 rounded-xl"
                      value={card.cvv}
                      onChange={(e) =>
                        setCard({ ...card, cvv: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {method === "netbanking" && (
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full bg-black/40 px-3 py-3 rounded-xl text-white"
                >
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>AXIS</option>
                </select>
              )}

              <button
                onClick={payNow}
                className="mt-6 w-full py-3 rounded-2xl bg-green-400 text-black font-bold"
              >
                Pay ₹{amount}
              </button>
            </>
          )}

          {step === "processing" && (
            <div className="text-center py-10">
              <div className="mx-auto w-12 h-12 border-4 border-white/10 border-t-green-400 rounded-full animate-spin" />
              <p className="mt-4 text-white">Processing payment...</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-10">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center text-green-300 text-2xl">
                ✓
              </div>
              <p className="text-white text-xl font-bold mt-4">
                Payment Successful
              </p>
              <p className="text-gray-400 text-sm">
                Your subscription has been activated successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
