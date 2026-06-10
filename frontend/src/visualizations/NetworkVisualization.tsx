import {
  useState,
  useEffect
} from "react";

type Props = {
  data: {
    nodes: {
      id: string;
    }[];

    connections: {
      source: string;
      target: string;
    }[];

    steps: {
      active: string;
      message: string;
    }[];
  };
};

function NetworkVisualization({
  data
}: Props) {

  const nodes =
    data?.nodes || [];

  const connections =
    data?.connections || [];

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

  const spacing =
    750 /
    Math.max(
      nodes.length - 1,
      1
    );

  const positions =
    nodes.map(
      (_, index) => ({
        x:
          70 +
          index * spacing,
        y: 120
      })
    );

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
        Network Visualization
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
          Active:
        </strong>
        {" "}
        {current?.active}

        {" | "}

        <strong>
          Message:
        </strong>
        {" "}
        {current?.message}

      </div>

      <svg
        width="900"
        height="320"
        style={{
          border:
            "2px solid #e5e7eb",
          borderRadius: "12px"
        }}
      >

        {connections.map(
          (
            connection,
            index
          ) => {

            const sourceIndex =
              nodes.findIndex(
                node =>
                  node.id ===
                  connection.source
              );

            const targetIndex =
              nodes.findIndex(
                node =>
                  node.id ===
                  connection.target
              );

            const source =
              positions[sourceIndex];

            const target =
              positions[targetIndex];

            if (
              !source ||
              !target
            ) {
              return null;
            }

            return (

              <line
                key={index}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="#6b7280"
                strokeWidth="3"
              />

            );
          }
        )}

        {nodes.map(
          (
            node,
            index
          ) => {

            const pos =
              positions[index];

            const label =
              node.id.split(" ");

            return (

              <g
                key={node.id}
              >

                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="25"
                  fill={
                    node.id ===
                    current?.active
                      ? "#22c55e"
                      : "#3b82f6"
                  }
                />

                <text
                  x={pos.x}
                  y={pos.y + 45}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {label.map(
                    (
                      word,
                      labelIndex
                    ) => (

                      <tspan
                        key={labelIndex}
                        x={pos.x}
                        dy={
                          labelIndex === 0
                            ? 0
                            : 14
                        }
                      >
                        {word}
                      </tspan>

                    )
                  )}
                </text>

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

export default NetworkVisualization;