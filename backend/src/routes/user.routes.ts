import { Router } from "express";

import {
  authenticate,
  AuthRequest
}
from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/profile",
  authenticate,
  (req: AuthRequest, res) => {

    res.json({
      message:
        "Protected route",
      user: req.user
    });
  }
);

export default router;