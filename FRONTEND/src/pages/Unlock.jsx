import AppLayout from "../layout/AppLayout";

export default function Unlock() {
  return (
    <AppLayout>
      <h2 className="text-xl font-semibold">
        Want deeper insights & extra rewards?
      </h2>

      <p className="text-gray-300">
        Unlock advanced personalization after you build your first streak.
      </p>

      <button className="bg-amber-400 text-black px-5 py-2 rounded">
        Unlock now →
      </button>
    </AppLayout>
  );
}
