import {
  useState,
  useEffect
} from "react";

type Props = {
  data: {
    array: number[];
    target: number;

    steps: {
      mid: number;
      value: number;
      action: string;
    }[];
  };
};

function ArrayVisualization({
  data
}: Props) {

  const numbers =
    data?.array || [];

  const target =
    data?.target;

  const steps =
    data?.steps || [];

  const [step, setStep] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const currentIndex =
    steps[step]?.mid ?? 0;

  const currentValue =
    steps[step]?.value ??
    numbers[currentIndex];

  const currentAction =
    steps[step]?.action ??
    "";

  const found =
    currentAction ===
    "found";

  useEffect(() => {

    if (!isPlaying) {
      return;
    }

    const timer =
      setInterval(() => {

        setStep(prev => {

          if (
            prev >=
            steps.length - 1
          ) {

            setIsPlaying(
              false
            );

            return prev;
          }

          return prev + 1;
        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    isPlaying,
    steps.length
  ]);

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
          text-2xl
          font-bold
          mb-4
        "
      >
        Binary Search Visualization
      </h2>

      <p className="mb-3">
        Target:
        <strong>
          {" "}
          {target}
        </strong>
      </p>

      <div
        className="
          flex
          gap-3
          flex-wrap
          mb-6
        "
      >

        {numbers.map(
          (
            value,
            index
          ) => (

            <div
              key={index}
              className={`
                w-14
                h-14
                border-2
                rounded-lg
                flex
                items-center
                justify-center
                font-bold

                ${
                  index === currentIndex
                    ? "bg-orange-400 text-white border-orange-500"
                    : "bg-white border-gray-300"
                }
              `}
            >
              {value}
            </div>
          )
        )}

      </div>

      <p className="mb-2">
        Current Value:
        <strong>
          {" "}
          {currentValue}
        </strong>
      </p>

      <p className="mb-2">
        Action:
        <strong>
          {" "}
          {currentAction}
        </strong>
      </p>

      <p className="mb-4">
        Step:
        <strong>
          {" "}
          {step + 1}
        </strong>
      </p>

      {found && (

        <div
          className="
            mb-4
            p-3
            rounded-lg
            bg-green-100
            text-green-700
            font-semibold
          "
        >
          Target Found ✅
        </div>
      )}

      <div
        className="
          flex
          gap-3
          flex-wrap
        "
      >

        <button
          onClick={() =>
            setIsPlaying(true)
          }
          className="
            px-4
            py-2
            bg-green-600
            text-white
            rounded-lg
          "
        >
          Play
        </button>

        <button
          onClick={() =>
            setIsPlaying(false)
          }
          className="
            px-4
            py-2
            bg-yellow-500
            text-white
            rounded-lg
          "
        >
          Pause
        </button>

        <button
          onClick={() =>
            setStep(
              prev =>
                Math.min(
                  prev + 1,
                  steps.length - 1
                )
            )
          }
          className="
            px-4
            py-2
            bg-blue-600
            text-white
            rounded-lg
          "
        >
          Step
        </button>

        <button
          onClick={() => {

            setStep(0);

            setIsPlaying(
              false
            );

          }}
          className="
            px-4
            py-2
            bg-gray-600
            text-white
            rounded-lg
          "
        >
          Reset
        </button>

      </div>

    </div>
  );
}

export default ArrayVisualization;