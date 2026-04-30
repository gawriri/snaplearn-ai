import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LearningScreen() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const ageGroup = location.state || "4-6";

  const speak = (text) => {
    if (!text) return;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const getEssay = (result) => {
    return (
      result.object +
      " is a " +
      result.category +
      " that is used for " +
      result.usage +
      ". It is important in daily life and helps us in many activities."
    );
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="container">
      <h1>SnapLearn AI</h1>

      <h2>Upload Image</h2>

      <input
        type="file"
        onChange={(e) => {
          const selected = e.target.files[0];
          setFile(selected);
          setPreview(URL.createObjectURL(selected));
        }}
      />

      <br />
      <br />

      <button onClick={handleUpload}>Upload</button>

      {result && (
        <div className="card">

          {preview && (
            <img
              src={preview}
              alt="uploaded"
              style={{
                width: "100%",
                maxWidth: "250px",
                borderRadius: "12px",
                marginBottom: "10px",
              }}
            />
          )}

          <h3>{result.caption}</h3>

          <h2>Object: {result.object}</h2>
          <h3>Category: {result.category}</h3>
          <h3>Usage: {result.usage}</h3>

          <p>{result.description}</p>

          <button onClick={() => speak(result.description)}>
            Speak
          </button>

          {ageGroup === "7-10" && (
            <>
              <h3>Learn More</h3>
              <p>{getEssay(result)}</p>
            </>
          )}

          <br />

          <button
            onClick={() =>
              navigate("/quiz", {
                state: { result, ageGroup },
              })
            }
          >
            Go to Quiz
          </button>
        </div>
      )}

      <button
        className="age-btn"
        onClick={() => navigate("/age")}
      >
        Age Selection
      </button>

      <button
        className="home-btn"
        onClick={() => navigate("/learn", { state: ageGroup })}
      >
        Home
      </button>
    </div>
  );
}