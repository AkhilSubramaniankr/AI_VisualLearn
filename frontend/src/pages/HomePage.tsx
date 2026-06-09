import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function HomePage() {

  const [topic, setTopic] = useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const generateLesson =
    async () => {

      if (!topic.trim()) {
        return;
      }

      try {

        setLoading(true);

        const response =
          await api.post(
            "/lessons",
            {
              topic,
              difficulty: "beginner"
            }
          );
        console.log(
            "Navigate to:",
            `/lesson/${response.data.id}`
        );
        navigate(
          `/lesson/${response.data.id}`
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to generate lesson"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
  <div
    className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
      px-4
    "
  >

    <div
      className="
        bg-white
        p-8
        rounded-2xl
        shadow-lg
        w-full
        max-w-xl
      "
    >

      <h1
        className="
          text-4xl
          font-bold
          text-center
          mb-3
        "
      >
        VisualLearn AI
      </h1>

      <p
        className="
          text-center
          text-gray-600
          mb-6
        "
      >
        Learn technical topics visually
      </p>

      <input
        value={topic}
        onChange={(e) =>
          setTopic(
            e.target.value
          )
        }
        placeholder="Enter a topic..."
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          p-3
          mb-4
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <button
        onClick={generateLesson}
        disabled={loading}
        className="
          w-full
          bg-blue-600
          text-white
          p-3
          rounded-lg
          font-semibold
          hover:bg-blue-700
          transition
        "
      >
        {
          loading
            ? "Generating..."
            : "Generate Lesson"
        }
      </button>

    </div>

  </div>
);
}

export default HomePage;