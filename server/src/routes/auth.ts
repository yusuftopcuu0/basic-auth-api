import { Router } from "express";
import { User } from "../types/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

let users: User[] = [];
let idCounter = 1;

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: idCounter++,
    username,
    password,
  };

  users.push(newUser);

  return res.status(201).json({
    message: "User created successfully",
    user: { id: newUser.id, username: newUser.username },
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  const token = jwt.sign(
    { id: user?.id, username: user?.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({
    message: "Login successful",
    token,
    user: { id: user.id, username: user.username },
  });
});

export default router;
