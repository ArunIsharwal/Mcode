import AppLayout from "../layout/AppLayout";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const nav = useNavigate();

  return (
    <AppLayout>
      <h2 className="text-xl font-semibold">
        Let’s personalize your experience
      </h2>

      <p className="text-gray-400">
        Quick setup — takes less than 10 seconds.
      </p>

      <input
        placeholder="Your answer"
        className="p-3 rounded text-black"
      />

      <button
        onClick={() => nav("/home")}
        className="bg-amber-400 text-black px-4 py-2 rounded"
      >
        Continue
      </button>
    </AppLayout>
  );
}
