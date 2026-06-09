import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import lessonRoutes from "./routes/lesson.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/lessons",
  lessonRoutes
);

app.use(
  cors({
    origin:
      "http://localhost:5173"
  })
);

app.get("/", (req, res) => {
  res.json({
    message:
      "VisualLearn AI API"
  });
});

export default app;