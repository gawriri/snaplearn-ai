import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, ageGroup } = location.state;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");

  const playSound = (type) => {
    const src =
      type === "correct"
        ? "https://cdn.freesound.org/previews/612/612605_5674468-lq.mp3"
        : "https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3";

    const audio = new Audio(src);
    audio.volume = 1.0;
    audio.play().catch(() => {});
  };

  // REMOVE DUPLICATES
  const uniqueOptions = (options) => {
    return [...new Set(options)];
  };

  // 4–6
  const basicQuestions = () => [
    {
      type: "mcq",
      question: "What is this?",
      options: uniqueOptions([
        result.object,
        "apple",
        "car",
        "dog"
      ]),
      answer: result.object,
    },
    {
      type: "mcq",
      question: "This is a ___",
      options: uniqueOptions([
        result.object,
        "banana",
        "cat",
        "bus"
      ]),
      answer: result.object,
    },
    {
      type: "mcq",
      question: result.object + " is a:",
      options: uniqueOptions([
        result.category,
        "animal",
        "fruit",
        "vehicle",
        "object",
        "furniture"
      ]),
      answer: result.category,
    },
  ];

  // 7–10
  const advancedQuestions = () => [
    {
      type: "mcq",
      question: "Which category best describes this object?",
      options: uniqueOptions([
        result.category,
        "animal",
        "fruit",
        "vehicle",
        "object",
        "furniture"
      ]),
      answer: result.category,
    },
    {
      type: "mcq",
      question: "What is this used for?",
      options: uniqueOptions([
        result.usage,
        "home",
        "school",
        "travel",
        "general"
      ]),
      answer: result.usage,
    },
    {
      type: "mcq",
      question: "A " + result.object + " is a ___",
      options: uniqueOptions([
        result.category,
        "tool",
        "machine",
        "item"
      ]),
      answer: result.category,
    },
    {
      type: "mcq",
      question: "Which statement is correct?",
      options: uniqueOptions([
        result.object + " is used for " + result.usage,
        result.object + " is a building",
        result.object + " cannot be used"
      ]),
      answer: result.object + " is used for " + result.usage,
    },
    {
      type: "text",
      question: "Write 2 or 3 lines about this object",
      answer: "subjective",
    },
  ];

  const startQuiz = () => {
    const q =
      ageGroup === "4-6" ? basicQuestions() : advancedQuestions();

    setQuestions(q);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTextAnswer("");
  };

  const total = questions.length;
  const progressPercent = total
    ? Math.round(((current + 1) / total) * 100)
    : 0;

  const handleSelect = (opt) => {
    const correct =
      opt.toLowerCase() === questions[current].answer.toLowerCase();

    setIsCorrect(correct);
    setShowPopup(true);

    playSound(correct ? "correct" : "wrong");
  };

  const handleNext = () => {
    setShowPopup(false);

    // TEXT QUESTION → always move forward
    if (questions[current].type === "text") {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
      return;
    }

    // MCQ → only move if correct
    if (!isCorrect) return;

    setScore((prev) => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div>
      <div className="header">SnapLearn AI</div>

      <div className="container">

        {!questions.length && (
          <div className="card">
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        )}

        {!finished && questions.length > 0 && (
          <div className="card">

            <p>
              Question {current + 1} of {total}
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: progressPercent + "%" }}
              ></div>
            </div>

            <h2>{questions[current].question}</h2>

            {/* MCQ ONLY */}
            {questions[current].type === "mcq" &&
              questions[current].options.map((opt) => (
                <button key={opt} onClick={() => handleSelect(opt)}>
                  {opt}
                </button>
              ))}

            {/* TEXT ONLY */}
            {questions[current].type === "text" && (
              <>
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Write your answer..."
                />
                <button
                  onClick={() => {
                    setIsCorrect(true);
                    setShowPopup(true);
                  }}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        )}

        {finished && (
          <div className="card">
            <h2>Final Score</h2>
            <h3>{score} / {questions.length}</h3>

            <button onClick={startQuiz}>Play Again</button>

            <button
              onClick={() =>
                navigate("/learn", { state: ageGroup })
              }
            >
              Back to Learning
            </button>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <h1>{isCorrect ? "Correct!" : "Try Again!"}</h1>

          <button onClick={handleNext}>
            {isCorrect ? "Next" : "Try Again"}
          </button>
        </div>
      )}

      <button
        className="home-btn"
        onClick={() => navigate("/learn", { state: ageGroup })}
      >
        Home
      </button>

      <button
        className="age-btn"
        onClick={() => navigate("/age")}
      >
        Age Selection
      </button>
    </div>
  );
}