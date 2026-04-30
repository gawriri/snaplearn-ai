import { useEffect } from "react";

const COLOR_CSS = {
  red: "#FF4444",
  blue: "#3B82F6",
  green: "#22C55E",
  yellow: "#FACC15",
  orange: "#F97316",
  purple: "#A855F7",
  pink: "#EC4899",
  cyan: "#06B6D4",
  gray: "#9CA3AF",
  black: "#1F2937",
  white: "#E5E7EB",
};

function speak(object, color, description) {
  window.speechSynthesis.cancel();

  const text =
    "This is a " + color + " " + object + ". " + description;

  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;
  msg.pitch = 1.1;

  window.speechSynthesis.speak(msg);
}

export default function ResultCard({ result, preview }) {
  const { object, color, description } = result;
  const dotColor = COLOR_CSS[color] || "#9CA3AF";

  return (
    <div className="card">

      {/* IMAGE */}
      {preview && (
        <img
          src={preview}
          alt="uploaded"
          style={{
            width: "100%",
            maxWidth: "250px",
            borderRadius: "12px",
          }}
        />
      )}

      {/* OBJECT */}
      <p style={label}>Detected Object</p>
      <p style={value}>{object}</p>

      {/* COLOR */}
      <p style={label}>Color</p>
      <div style={colorRow}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: dotColor,
          }}
        ></span>
        <span style={value}>{color}</span>
      </div>

      {/* DESCRIPTION */}
      <p style={label}>Description</p>
      <p style={desc}>{description}</p>

      {/* SPEAK */}
      <button
        onClick={() => speak(object, color, description)}
        style={button}
      >
        Speak
      </button>
    </div>
  );
}

/* STYLES */

const label = {
  fontSize: 12,
  fontWeight: "bold",
  color: "#888",
};

const value = {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
};

const colorRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 10,
};

const desc = {
  fontSize: 14,
  lineHeight: 1.5,
  background: "#FFF9F0",
  padding: 10,
  borderRadius: 10,
  marginBottom: 15,
};

const button = {
  padding: "10px",
  borderRadius: "20px",
  border: "none",
  background: "#FFA239",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};