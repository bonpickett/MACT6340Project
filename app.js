import express from "express";
import * as utils from "./utils/utils.js";
import * as db from "./utils/database.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];

const app = express();
app.use(cors());
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
 await db.connect().then(async () => {
  projects = await db.getALLProjects();
  console.log(projects);
  let projectRandom = Math.floor(Math.random() * projects.length);
  res.render("index.ejs", { featuredProject: projects[projectRandom] });
 });
});

app.get("/projects", (req, res) => {
 res.render("projects.ejs", { projectArray: projects });
});

app.get("/project/:id", (req, res) => {
 let id = req.params.id;
 if (id > data.length) {
  throw new Error("No project with that ID");
 }
 res.render("project.ejs", { project: projects[id - 1], which: id });
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

app.use((err, req, res, next) => {
 console.log(err);
 msg = err.message;
 if (msg != "No project with that ID") {
  msg =
   "There was an internal error. Apologies. We are working on cleaning up the mess.";
 }
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
