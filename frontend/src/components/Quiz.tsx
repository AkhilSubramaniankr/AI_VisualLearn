import { useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type Props = {
  questions: QuizQuestion[];
};

function Quiz({
  questions
}: Props) {

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selected, setSelected] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [showResult, setShowResult] =
    useState(false);

  const question =
    questions[currentQuestion];

  const checkAnswer = () => {

    if (
      selected === question.answer
    ) {

      setScore(
        prev => prev + 1
      );
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        prev => prev + 1
      );

      setSelected("");

    } else {

      setShowResult(true);
    }
  };

  if (showResult) {

    return (

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          Quiz Complete 🎉
        </h2>

        <p>
          Score:
          {" "}
          {score}
          /
          {questions.length}
        </p>

      </div>
    );
  }

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mt-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Quiz
      </h2>

      <p
        className="
          mb-4
        "
      >
        {question.question}
      </p>

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >

        {question.options.map(
          option => (

            <button
              key={option}
              onClick={() =>
                setSelected(option)
              }
              className={`
                p-3
                rounded-lg
                border

                ${
                  selected === option
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }
              `}
            >
              {option}
            </button>
          )
        )}

      </div>

      <button
        onClick={checkAnswer}
        disabled={!selected}
        className="
          mt-4
          px-4
          py-2
          bg-green-600
          text-white
          rounded-lg
        "
      >
        Check Answer
      </button>

    </div>
  );
}

export default Quiz;