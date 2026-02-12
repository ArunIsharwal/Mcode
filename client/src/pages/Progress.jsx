import AppLayout from "../layout/AppLayout";

export default function Progress() {
  return (
    <AppLayout>
      <h2 className="text-xl font-semibold">
        Your Habit Momentum
      </h2>

      <p className="text-gray-300">
        Every small log builds awareness and consistency.
      </p>

      <ul className="space-y-2">
        <li>Day 1 — Awareness Started</li>
        <li>Day 3 — Pattern Builder</li>
        <li>Day 7 — Sugar Spotter</li>
      </ul>
    </AppLayout>
  );
}
