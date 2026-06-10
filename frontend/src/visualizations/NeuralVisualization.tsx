import {
  useState,
  useEffect
} from "react";

type Props = {
  data: {
    layers: {
      name: string;
      nodes: number;
    }[];

    steps: {
      activeLayer: string;
      message: string;
    }[];
  };
};

function NeuralVisualization({
  data
}: Props) {

  const layers =
    data?.layers || [];

  const steps =
    data?.steps || [];

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
            steps.length - 1
          ) {

            setIsPlaying(false);

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

  const current =
    steps[step];

  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (

    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "24px"
      }}
    >

      <h2>
        Neural Network Visualization
      </h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "12px",
          border:
            "1px solid #e5e7eb",
          borderRadius: "10px"
        }}
      >

        <strong>
          Active Layer:
        </strong>
        {" "}
        {current?.activeLayer}

        {" | "}

        <strong>
          Message:
        </strong>
        {" "}
        {current?.message}

      </div>

      <svg
        width="900"
        height="400"
        style={{
          border:
            "2px solid #e5e7eb",
          borderRadius: "12px"
        }}
      >

        {layers.map(
          (
            layer,
            layerIndex
          ) => {

            const x =
              150 +
              layerIndex * 300;

            return (

              <g
                key={layer.name}
              >

                <text
                  x={x}
                  y="40"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {layer.name}
                </text>

                {Array.from({
                  length:
                    layer.nodes
                }).map(
                  (_, nodeIndex) => {

                    const y =
                      100 +
                      nodeIndex * 70;

                    return (

                      <circle
                        key={nodeIndex}
                        cx={x}
                        cy={y}
                        r="20"
                        fill={
                          layer.name ===
                          current?.activeLayer
                            ? "#22c55e"
                            : "#3b82f6"
                        }
                      />

                    );
                  }
                )}

              </g>

            );
          }
        )}

      </svg>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
                steps.length - 1
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

export default NeuralVisualization;