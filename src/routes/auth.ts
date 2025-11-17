import { Router } from "express";
import { User } from "../types/User";

const router = Router();

let users: User[] = [];
let idCounter = 1;

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser: User = {
    id: idCounter++,
    username,
    password,
  };

  users.push(newUser);

  return res
    .status(201)
    .json({ message: "User created successfully", user: newUser });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ message: "Login successful", user });
});

export default router;
