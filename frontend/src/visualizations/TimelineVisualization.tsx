import {
  useState
} from "react";

type Props = {
  data: {
    events: {
      year: string;
      title: string;
      description?: string;
    }[];
  };
};

function TimelineVisualization({
  data
}: Props) {

  const events =
    data?.events || [];

  const [selected,
    setSelected] =
    useState(0);

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        marginTop: "24px"
      }}
    >

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Timeline Visualization
      </h2>

      <div>

        {events.map(
          (
            event,
            index
          ) => {

            const isSelected =
              selected === index;

            return (

              <div
                key={index}
                onClick={() =>
                  setSelected(index)
                }
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  cursor: "pointer"
                }}
              >

                {/* YEAR */}

                <div
                  style={{
                    width: "100px",
                    textAlign: "right",
                    paddingRight: "20px",
                    fontWeight: "bold",
                    color:
                      isSelected
                        ? "#2563eb"
                        : "#6b7280"
                  }}
                >
                  {event.year}
                </div>

                {/* TIMELINE */}

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    width: "40px"
                  }}
                >

                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius:
                        "50%",
                      background:
                        isSelected
                          ? "#22c55e"
                          : "#3b82f6",
                      transition:
                        "all 0.25s ease",
                      zIndex: 2
                    }}
                  />

                  {index <
                    events.length - 1 && (

                    <div
                      style={{
                        width: "4px",
                        height: "80px",
                        background:
                          "#d1d5db"
                      }}
                    />

                  )}

                </div>

                {/* CARD */}

                <div
                  style={{
                    flex: 1,

                    background:
                      isSelected
                        ? "#eff6ff"
                        : "#ffffff",

                    border:
                      isSelected
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",

                    borderRadius:
                      "12px",

                    padding: "16px",

                    overflow: "hidden",

                    maxHeight:
                      isSelected
                        ? "250px"
                        : "70px",

                    transition:
                      "all 0.3s ease"
                  }}
                >

                  <h3
                    style={{
                      margin: 0,
                      color:
                        isSelected
                          ? "#2563eb"
                          : "#111827"
                    }}
                  >
                    {event.title}
                  </h3>

                  {isSelected &&
                    event.description && (

                    <p
                      style={{
                        marginTop: "12px",
                        color: "#4b5563",
                        lineHeight: "1.6"
                      }}
                    >
                      {event.description}
                    </p>

                  )}

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>

  );
}

export default TimelineVisualization;