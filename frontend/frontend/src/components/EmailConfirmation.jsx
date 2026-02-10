export default function EmailConfirmation({ email }) {
  return (
    <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300">
      📧 A confirmation email has been sent to  
      <span className="text-green-400 font-semibold"> {email}</span>
    </div>
  );
}
