import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import Unlock from "./pages/Unlock";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/start" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/unlock" element={<Unlock />} />
      </Routes>
    </BrowserRouter>
  );
}
