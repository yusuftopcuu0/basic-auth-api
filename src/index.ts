import express from "express";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Basic Auth API with TypeScript");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

