import { Request, Response } from "express";

import prisma from "../prisma/client";

import {
  hashPassword,
  comparePassword,
  generateToken
} from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    const passwordHash =
      await hashPassword(password);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash
        }
      });

    return res.status(201).json({
      message:
        "User registered",
      userId: user.id
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Internal Server Error"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid credentials"
      });
    }

    const isValid =
      await comparePassword(
        password,
        user.passwordHash
      );

    if (!isValid) {
      return res.status(401).json({
        message:
          "Invalid credentials"
      });
    }

    const token =
      generateToken(
        user.id,
        user.email
      );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Internal Server Error"
    });
  }
};