import { model } from "./groq";

import {
  geminiModel
}
from "./gemini";

import {
  lessonPrompt
}
from "./prompts";

import {
  provider
}
from "./provider";

function cleanJson(
  text: string
) {

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function
generateLesson(
  topic: string
) {

  const prompt =
    lessonPrompt(topic);

  if (
    provider === "groq"
  ) {

    const response =
      await model.create({
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

    const text =
      response.choices?.[0]?.message?.content ?? "";

    return JSON.parse(
      cleanJson(text)
    );
  }

  const result =
    await geminiModel.generateContent(
      prompt
    );

  const text =
    result.response.text();

  return JSON.parse(
    cleanJson(text)
  );
}