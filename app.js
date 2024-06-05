import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";
let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
 await db
  .connect()
  .then(async () => {
   projects = db.getALLProjects();
   console.log(projects);
   res.render("index.ejs");
  })
  .catch(next);
});

app.get("/projects", (req, res) => {
 res.render("projects.ejs", { projectArray: projects });
});

app.get("/project/:id", (req, res) => {
 let id = req.params.id;
 if (id > data.length) {
  throw new Error("No project with that ID");
 }
 res.render("project.ejs", { projectArray: data, which: id });
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
 res.render("error.ejs");
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
