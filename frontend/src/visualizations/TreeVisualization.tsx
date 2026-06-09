import {
  useState,
  useEffect
} from "react";

type Props = {
  data: {
    nodes: {
      id: string;
    }[];

    edges: {
      parent: string;
      child: string;
    }[];

    target: string;

    steps: {
      visited: string;
      action: string;
    }[];
  };
};

function TreeVisualization({
  data
}: Props) {

  const nodes =
    data?.nodes || [];

  const edges =
    data?.edges || [];

  const target =
    data?.target;

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

  const currentNode =
    steps[step]?.visited;

  const currentAction =
    steps[step]?.action;

  const found =
    currentAction === "found";

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

  const positions =
    nodes.map(
      (_, index) => ({

        x:
          120 +
          (index % 4) * 180,

        y:
          60 +
          Math.floor(
            index / 4
          ) * 120

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
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "24px"
      }}
    >

      <h2>
        Tree Visualization
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >

        <div
          style={{
            padding: "12px 16px",
            border:
              "1px solid #e5e7eb",
            borderRadius: "10px"
          }}
        >
          <strong>
            Target:
          </strong>
          {" "}
          {target}
        </div>

        <div
          style={{
            padding: "12px 16px",
            border:
              "1px solid #e5e7eb",
            borderRadius: "10px"
          }}
        >
          <strong>
            Current:
          </strong>
          {" "}
          {currentNode}
        </div>

        <div
          style={{
            padding: "12px 16px",
            border:
              "1px solid #e5e7eb",
            borderRadius: "10px"
          }}
        >
          <strong>
            Action:
          </strong>
          {" "}
          {currentAction}
        </div>

      </div>

      <svg
        width="800"
        height="350"
        style={{
          border:
            "2px solid #e5e7eb",
          borderRadius:
            "12px"
        }}
      >

        {edges.map(
          (
            edge,
            index
          ) => {

            const parentIndex =
              nodes.findIndex(
                node =>
                  node.id ===
                  edge.parent
              );

            const childIndex =
              nodes.findIndex(
                node =>
                  node.id ===
                  edge.child
              );

            const parent =
              positions[parentIndex];

            const child =
              positions[childIndex];

            if (
              !parent ||
              !child
            ) {
              return null;
            }

            return (

              <line
                key={index}
                x1={parent.x}
                y1={parent.y}
                x2={child.x}
                y2={child.y}
                stroke="#6b7280"
                strokeWidth="2"
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

            if (!pos) {
              return null;
            }

            return (

              <g
                key={node.id}
              >

                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="28"
                  fill={
                    node.id ===
                    currentNode
                      ? "#22c55e"
                      : "#3b82f6"
                  }
                />

                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontWeight="bold"
                >
                  {node.id}
                </text>

              </g>

            );
          }
        )}

      </svg>

      {found && (

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background:
              "#dcfce7",
            color:
              "#166534",
            borderRadius:
              "8px",
            fontWeight:
              "bold"
          }}
        >
          Target Found ✅
        </div>

      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px"
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

export default TreeVisualization;