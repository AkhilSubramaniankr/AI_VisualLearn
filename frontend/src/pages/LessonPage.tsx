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
      <div>
        Loading...
      </div>
    );
  }
  console.log(
  lesson.lessonJson.visualizationData
  );

  return (
    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>
        {lesson.topic}
      </h1>

      <p>
        {lesson.lessonJson.overview}
      </p>
      
      <LessonRenderer
        type={lesson.lessonJson.visualizationType}

        data={lesson.lessonJson.visualizationData}
        />

      <hr />

      {lesson.lessonJson.cards.map(
        (
          card: any,
          index: number
        ) => (
          <div key={index}>

            <h2>
              {card.title}
            </h2>

            <p>
              {card.content}
            </p>

          </div>
        )
      )}
    <Quiz
  questions={
    lesson.lessonJson.quiz
  }
/>
    </div>
  );
}

export default LessonPage;