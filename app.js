import express from "express";
import qr from "qr-image";
import fs from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  let content = req.body.qrContent;

  var qr_svg = qr.image(content);
  qr_svg.pipe(fs.createWriteStream(__dirname + "/public/images/qrImage.png"));

  const showImage = true;
  res.render("index.ejs", { showImage });
});

app.get("/download", (req, res) => {
  res.download(__dirname + "/public/images/qrImage.png");
});

app.listen(port);
