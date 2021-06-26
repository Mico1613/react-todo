import express from "express";
import path from "path";
import cors from "cors";
const port = process.env.PORT || 8080;
const app = express();
const __dirname = path.resolve();
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port);
