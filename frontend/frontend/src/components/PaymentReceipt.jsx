export default function PaymentReceipt({ txnId, planName, amount, method }) {
  const downloadReceipt = () => {
    const content = `
FitTrack Membership Receipt

Transaction ID: ${txnId}
Plan: ${planName}
Amount Paid: ₹${amount}
Payment Method: ${method}
Status: Successful

Thank you for choosing FitTrack.
`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `FitTrack_Receipt_${txnId}.txt`;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <button
      onClick={downloadReceipt}
      className="
        mt-5 px-5 py-2.5 rounded-xl
        flex items-center justify-center gap-2
        bg-gradient-to-r from-white/10 to-white/5
        text-white font-medium tracking-wide
        border border-white/10
        backdrop-blur-md
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        hover:bg-white/15
        hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]
        hover:scale-[1.03]
        active:scale-[0.96]
        transition-all duration-300
      "
    >

      {/* Icon */}
      <span className="text-lg">
        🧾
      </span>

      {/* Text */}
      <span>
        Download Receipt
      </span>

    </button>
  );
}