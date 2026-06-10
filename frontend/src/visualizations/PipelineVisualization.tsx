import {
  useState,
  useEffect
} from "react";

type Props = {
  data: {
    stages: {
      name: string;
      description: string;
    }[];
  };
};

function PipelineVisualization({
  data
}: Props) {

  const stages =
    data?.stages || [];

  const [step, setStep] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  useEffect(() => {

    setStep(0);

    setIsPlaying(false);

  }, [data]);

  useEffect(() => {

    if (!isPlaying) {
      return;
    }

    const timer =
      setInterval(() => {

        setStep(prev => {

          if (
            prev >=
            stages.length - 1
          ) {

            setIsPlaying(false);

            return prev;
          }

          return prev + 1;

        });

      }, 1200);

    return () =>
      clearInterval(timer);

  }, [
    isPlaying,
    stages.length
  ]);

  const progress =
    stages.length > 1
      ? (
          step /
          (stages.length - 1)
        ) * 100
      : 0;

  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (

    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "24px"
      }}
    >

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        Pipeline Visualization
      </h2>

      {/* Progress */}

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#22c55e",
            transition:
              "width 0.4s ease"
          }}
        />

      </div>

      {stages.map(
        (
          stage,
          index
        ) => {

          const completed =
            index < step;

          const active =
            index === step;

          return (

            <div
              key={index}
            >

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems:
                    "flex-start"
                }}
              >

                {/* STATUS */}

                <div
                  style={{
                    width: "20px",
                    display: "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center"
                  }}
                >

                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius:
                        "50%",

                      background:
                        active
                          ? "#22c55e"
                          : completed
                          ? "#2563eb"
                          : "#d1d5db"
                    }}
                  />

                  {index <
                    stages.length - 1 && (

                    <div
                      style={{
                        width: "4px",
                        height: "70px",
                        background:
                          completed
                            ? "#2563eb"
                            : "#d1d5db"
                      }}
                    />

                  )}

                </div>

                {/* CARD */}

                <div
                  style={{
                    flex: 1,

                    background:
                      active
                        ? "#eff6ff"
                        : "#ffffff",

                    border:
                      active
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",

                    borderRadius:
                      "12px",

                    padding: "16px",

                    marginBottom:
                      "16px",

                    transition:
                      "all 0.3s ease"
                  }}
                >

                  <h3
                    style={{
                      margin: 0
                    }}
                  >
                    {stage.name}
                  </h3>

                  {(active ||
                    completed) && (

                    <p
                      style={{
                        marginTop:
                          "10px",
                        color:
                          "#4b5563"
                      }}
                    >
                      {
                        stage.description
                      }
                    </p>

                  )}

                </div>

              </div>

            </div>

          );
        }
      )}

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}
      >

        <button
          style={buttonStyle}
          onClick={() =>
            setIsPlaying(true)
          }
        >
          ▶ Play
        </button>

        <button
          style={buttonStyle}
          onClick={() =>
            setIsPlaying(false)
          }
        >
          ⏸ Pause
        </button>

        <button
          style={buttonStyle}
          onClick={() =>
            setStep(prev =>
              Math.min(
                prev + 1,
                stages.length - 1
              )
            )
          }
        >
          ⏭ Step
        </button>

        <button
          style={buttonStyle}
          onClick={() => {

            setStep(0);

            setIsPlaying(false);

          }}
        >
          🔄 Reset
        </button>

      </div>

    </div>

  );
}

export default PipelineVisualization;