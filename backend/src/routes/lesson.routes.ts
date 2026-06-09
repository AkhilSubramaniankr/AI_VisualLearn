import { Router } from "express";

import {
  createLesson,
  getLessons,
  getLessonById,
  deleteLesson,
  renderLesson
}
from "../controllers/lesson.controller";

const router = Router();

router.post(
  "/",
  createLesson
);

router.get(
  "/",
  getLessons
);

router.get(
  "/:id/render",
  renderLesson
);

router.get(
  "/:id",
  getLessonById
);

router.delete(
  "/:id",
  deleteLesson
);

export default router;
