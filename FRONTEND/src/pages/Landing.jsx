import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

export default function Landing() {
  const nav = useNavigate();

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold leading-snug">
        NudgeLoop
      </h1>

      <p className="text-gray-300">
        Beat the sugar spike using small daily nudges, simple awareness,
        and rewarding progress.
      </p>

      <button
        onClick={() => nav("/start")}
        className="bg-amber-400 text-black px-6 py-3 rounded-xl font-semibold"
      >
        Start in 10 seconds — No signup
      </button>
    </AppLayout>
  );
}
