import {
  useState,
  useEffect
} from "react";

type Props = {
  data: {
    components: {
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

function ArchitectureVisualization({
  data
}: Props) {

  const components =
    data?.components || [];

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

  const positions = [

    { x: 350, y: 60 },

    { x: 350, y: 160 },

    { x: 180, y: 280 },

    { x: 520, y: 280 },

    { x: 350, y: 400 }

  ];

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
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "24px"
      }}
    >

      <h2>
        Architecture Visualization
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
        width="700"
        height="500"
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
              components.findIndex(
                component =>
                  component.id ===
                  connection.source
              );

            const targetIndex =
              components.findIndex(
                component =>
                  component.id ===
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

        {components.map(
          (
            component,
            index
          ) => {

            const pos =
              positions[index];

            if (!pos) {
              return null;
            }

            return (

              <g
                key={component.id}
              >

                <rect
                  x={pos.x - 70}
                  y={pos.y - 25}
                  width="140"
                  height="50"
                  rx="12"
                  fill={
                    component.id ===
                    current?.active
                      ? "#22c55e"
                      : "#3b82f6"
                  }
                />

                <text
                  x={pos.x}
                  y={pos.y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="bold"
                >
                  {component.id}
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

export default ArchitectureVisualization;