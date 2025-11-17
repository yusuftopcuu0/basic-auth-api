import express from "express";
import authRoutes from "./routes/auth";
import cors from "cors";

import { authMiddleware } from "./middleware/auth";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Basic Auth API with TypeScript");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.get("/me", authMiddleware, (req: any, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});
