import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/mail", async (req, res, err) => {
  await utils
    .sendMessage(req.body.sub, req.body.txt)
    .then(() => {
      res.send({ result: "Message Sent!" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: "Message failed to send" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
