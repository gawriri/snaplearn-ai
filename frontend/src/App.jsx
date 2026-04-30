import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AgeSelect from "./pages/AgeSelect";
import LearningScreen from "./pages/LearningScreen";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/age" element={<AgeSelect />} />
        <Route path="/learn" element={<LearningScreen />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}