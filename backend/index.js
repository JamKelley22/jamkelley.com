const express = require("express");
const helmet = require('helmet');
const app = express();
const https = require("https");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(helmet());

const key = fs.readFileSync("/etc/letsencrypt/live/jamkelley.com/privkey.pem");
const cert = fs.readFileSync("/etc/letsencrypt/live/jamkelley.com/cert.pem");
const options = {
  key: key,
  cert: cert,
};

const status = (error, message) => {
  return JSON.stringify({
    error: error,
    message: message,
  });
};

//=====Resume=====
const resumeJSONPath = "./resume.json";
const resumePDFPath = "./resume.pdf";
app.get("/api/resume/json", function (req, res) {
  res.sendFile(path.join(__dirname, resumeJSONPath));
});
app.get("/api/resume/pdf", function (req, res) {
  res.sendFile(path.join(__dirname, resumePDFPath));
});

app.get("/api/resume/json/status", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  let error = false,
    message = "";

  const jsonExists = fs.existsSync(resumeJSONPath);
  if (!jsonExists) {
    res.status(404);
    error = true;
    message = "Resume JSON does not exist";
  }

  res.end(status(error, message));
});
app.get("/api/resume/pdf/status", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  let error = false,
    message = "";

  const pdfExists = fs.existsSync(resumePDFPath);
  if (!pdfExists) {
    res.status(404);
    error = true;
    message = "Resume PDF does not exist";
  }

  res.end(status(error, message));
});

//=====Writing=====
const writingFolder = "/Writing";
app.get("/api/writing", function (req, res) {
  fs.readdir(path.join(__dirname, writingFolder), (err, files) => {
    files.forEach((file) => {
      console.log(file);
    });
    res.json(files);
  });
});
app.get("/api/writing/:filename", function (req, res) {
  const file = path.join(__dirname, writingFolder, req.params.filename);
  console.log(file);
  res.sendFile(file);
});

//=====Downloads=====
const downloadsFolder = "/Downloads";
app.get("/api/downloads", function (req, res) {
  res.sendFile(path.join(__dirname, downloadsFolder, "info.json"));
});
app.get("/api/downloads/:filename", function (req, res) {
  const file = path.join(__dirname, downloadsFolder, req.params.filename);
  //console.log(file);
  res.sendFile(file);
});
app.get("/api/downloads/:filename/status", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const filePath = path.join(__dirname, downloadsFolder, req.params.filename);

  let error = false,
    message = "";

  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    res.status(404);
    error = true;
    message = req.params.filename + " does not exist";
  }

  res.end(status(error, message));
});

//=====Chatbot=====
app.get("/api/chatbot/json", function (req, res) {
  res.sendFile(path.join(__dirname, "chatbotData.json"));
});

var server = https.createServer(options, app);
const port = 9090;
server.listen(port, () => {
  console.log("Server starting on port: " + port);
});
