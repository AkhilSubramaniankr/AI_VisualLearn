import dotenv from "dotenv";

dotenv.config();

import {
  generateLesson
} from "./ai/lesson.generator";

async function run() {

  const lesson =
    await generateLesson(
      "Binary Search"
    );

  console.log(
    JSON.stringify(
      lesson,
      null,
      2
    )
  );
}

run();