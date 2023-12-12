import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("server up and runnning");
});

const port = 5000;

app.listen(port, console.log(`Server listening on port ${port}`));
