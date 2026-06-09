import { Request, Response } from "express";
import prisma from "../prisma/client";
import {
  generateLesson
}
from "../ai/lesson.generator";

type LessonParams = {
  id: string;
};

export const createLesson = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      topic,
      difficulty
    } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({
        message: "Topic and difficulty are required"
      });
    }

    const lessonJson =
      await generateLesson(topic);

    const lesson =
      await prisma.lesson.create({
        data: {
          topic,
          difficulty,
          lessonJson
        }
      });

    return res.status(201).json(
      lesson
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Failed to create lesson"
    });
  }
};

export const getLessons = async (
  req: Request,
  res: Response
) => {

  try {

    const lessons =
      await prisma.lesson.findMany({
        orderBy: {
          createdAt: "desc"
        }
      });

    return res.json(
      lessons
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Failed to fetch lessons"
    });
  }
};

export const getLessonById = async (
  req: Request<LessonParams>,
  res: Response
) => {

  try {

    const lessonId =
      req.params.id;

    const lesson =
      await prisma.lesson.findUnique({
        where: {
          id: lessonId
        }
      });

    if (!lesson) {

      return res.status(404).json({
        message:
          "Lesson not found"
      });
    }

    return res.json(
      lesson
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Failed to fetch lesson"
    });
  }
};

export const deleteLesson = async (
  req: Request<LessonParams>,
  res: Response
) => {

  try {

    const lessonId =
      req.params.id;

    await prisma.lesson.delete({
      where: {
        id: lessonId
      }
    });

    return res.json({
      message:
        "Lesson deleted"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Delete failed"
    });
  }
};

export const renderLesson = async (
  req: Request<LessonParams>,
  res: Response
) => {

  try {

    const lesson =
      await prisma.lesson.findUnique({
        where: {
          id: req.params.id
        }
      });

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    return res.json({
      topic: lesson.topic,
      difficulty: lesson.difficulty,
      lessonJson: lesson.lessonJson
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Render failed"
    });
  }
};