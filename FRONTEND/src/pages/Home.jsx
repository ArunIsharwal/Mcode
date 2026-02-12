import AppLayout from "../layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <h2 className="text-xl font-semibold">🔥 1 Day Streak</h2>

      <p className="text-gray-400">
        Log today to protect your momentum.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white text-black p-4 rounded-xl">
          ☕ Chai
        </button>

        <button className="bg-white text-black p-4 rounded-xl">
          🥤 Cold Drink
        </button>

        <button className="bg-white text-black p-4 rounded-xl">
          🍰 Sweet
        </button>

        <button className="bg-white text-black p-4 rounded-xl">
          🍫 Snack
        </button>
      </div>
    </AppLayout>
  );
}
