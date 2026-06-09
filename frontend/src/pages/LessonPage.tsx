import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../services/api";

import LessonRenderer
from "../components/LessonRenderer";

import Quiz
from "../components/Quiz";

import SectionCard
from "../components/SectionCard";

function LessonPage() {

  const { id } = useParams();

  const [lesson, setLesson] =
    useState<any>(null);

  useEffect(() => {

    const fetchLesson =
      async () => {

        try {

          const response =
            await api.get(
              `/lessons/${id}/render`
            );

          console.log(
            response.data
          );

          setLesson(
            response.data
          );

        } catch (error) {

          console.error(error);
        }
      };

    fetchLesson();

  }, [id]);

  if (!lesson) {

    return (
      <div
        style={{
          padding: "30px"
        }}
      >
        Loading...
      </div>
    );
  }

  return (

    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto"
      }}
    >

      {/* Overview */}

      <SectionCard
        title={lesson.topic}
      >

        <p>
          {
            lesson.lessonJson
              .overview
          }
        </p>

      </SectionCard>

      {/* Visualization */}

      <SectionCard
        title="Visualization"
      >

        <LessonRenderer
          type={
            lesson.lessonJson
              .visualizationType
          }

          data={
            lesson.lessonJson
              .visualizationData
          }
        />

      </SectionCard>

      {/* Learning Cards */}

      <SectionCard
        title="Learning Cards"
      >

        {
          lesson.lessonJson.cards.map(
            (
              card: any,
              index: number
            ) => (

              <div
                key={index}
                className="
                  mb-6
                "
              >

                <h3
                  className="
                    text-xl
                    font-semibold
                    mb-2
                  "
                >
                  {card.title}
                </h3>

                <p>
                  {card.content}
                </p>

              </div>

            )
          )
        }

      </SectionCard>

      {/* Quiz */}

      <SectionCard
        title="Quiz"
      >

        <Quiz
          questions={
            lesson.lessonJson
              .quiz
          }
        />

      </SectionCard>

    </div>
  );
}

export default LessonPage;