export default function Gyms() {
  const gyms = ["Gold Gym", "Anytime Fitness", "Cult Fit"];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Find Gyms Near You</h1>

      <input
        type="text"
        className="w-full p-3 border rounded mb-6"
        placeholder="Enter city or location"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {gyms.map((gym, i) => (
          <div
            key={i}
            className="p-6 border rounded shadow"
          >
            <h2 className="font-bold text-xl">{gym}</h2>
            <p className="text-gray-600">Open • 1.2 km away</p>
          </div>
        ))}
      </div>
    </div>
  );
}