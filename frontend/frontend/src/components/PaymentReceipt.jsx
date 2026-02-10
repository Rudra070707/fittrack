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
  };

  return (
    <button
      onClick={downloadReceipt}
      className="mt-4 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/15 transition"
    >
      🧾 Download Receipt
    </button>
  );
}
