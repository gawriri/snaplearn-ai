import { useNavigate } from "react-router-dom";

export default function AgeSelect() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Select Age Group</h1>

      <button onClick={() => navigate("/learn", { state: "4-6" })}>
        Age 4–6
      </button>

      <br /><br />

      <button onClick={() => navigate("/learn", { state: "7-10" })}>
        Age 7–10
      </button>
    </div>
  );
}