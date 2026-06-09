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
      source: string;
      target: string;
    }[];

    steps: {
      visited: string;
    }[];
  };
};

function GraphVisualization({
  data
}: Props) {

  const nodes =
    data?.nodes || [];

  const edges =
    data?.edges || [];

  const steps =
    data?.steps || [];

  const [step, setStep] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const currentNode =
    steps[step]?.visited;

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

  const positions = [
    { x: 100, y: 120 },
    { x: 250, y: 60 },
    { x: 400, y: 120 },
    { x: 250, y: 180 },
    { x: 520, y: 120 }
  ];

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
        Graph Visualization
      </h2>

      <p className="mb-4">
        Current Node:
        <strong>
          {" "}
          {currentNode}
        </strong>
      </p>

      <svg
        width="650"
        height="300"
      >

        {edges.map(
          (
            edge,
            index
          ) => {

            const sourceIndex =
              nodes.findIndex(
                n =>
                  n.id ===
                  edge.source
              );

            const targetIndex =
              nodes.findIndex(
                n =>
                  n.id ===
                  edge.target
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
                stroke="black"
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
                  r="25"
                  fill={
                    node.id ===
                    currentNode
                      ? "#22c55e"
                      : "#3b82f6"
                  }
                />

                <text
                  x={pos.x - 5}
                  y={pos.y + 5}
                  fill="white"
                >
                  {node.id}
                </text>

              </g>
            );
          }
        )}

      </svg>

      <div
        className="
          flex
          gap-3
          mt-4
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
            setStep(0)
          }
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

export default GraphVisualization;