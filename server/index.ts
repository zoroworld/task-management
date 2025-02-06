import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import authRoutes from "./src/routes/authRoutes";
import taskRoutes from "./src/routes/taskRoutes";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());


app.use(cors());



app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.use("/", (req, res) => {
  res.send('<h1>Server is running</h1>'); 
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
