import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function hashPassword(
  password: string
) {
  return await bcrypt.hash(
    password,
    SALT_ROUNDS
  );
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(
    password,
    hashedPassword
  );
}

export function generateToken(
  userId: string,
  email: string
) {
  return jwt.sign(
    {
      userId,
      email
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d"
    }
  );
}