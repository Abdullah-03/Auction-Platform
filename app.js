import express from "express";
import "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import connectDB from "./functions/connectDB.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server up and runnning");
});
app.use("/api/user", userRoutes);

const port = 5000;

connectDB().then(() => {
  app.listen(port, console.log(`Server listening on port ${port}`));
});
