const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.send("Hello API routes");
});

router.get("/videos", (req, res) => {
  const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  res.send(videos);
});

router.get("/videos/:id", (req, res) => {
  const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  // console.log("req.params.id", req.params.id);
  const foundVideo = videos.find((video) => video.id === req.params.id);
  if (foundVideo) {
    res.send(JSON.stringify(foundVideo));
  } else {
    res.status(400).send("video not found");
  }
});

router.post("/videos", (req, res) => {
  const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  // console.log(videos);
  // res.send(videos);
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Red Cow",
    image: "default.jpeg",
    description: req.body.description,
    views: "0",
    likes: "0",
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  console.log(newVideo);
  // res.send(newVideo);

  videos.push(newVideo);

  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  res.send("Video Uploaded!");
});

// router.get("/videos/:id", (req, res) => {
//     const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
//     const foundVideo = movies.find((video) => video.id === req.params.id);
//     if (foundVideo) {
//       res.send(JSON.stringify(foundVideo));
//     } else {
//       res.status(400).send("video not found");
//     }
//   });

// router.post("/videos", (req, res) => {
//   const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
// const newVideo = {
//   id: uuidv4(),
//   title: req.body.title,
//   channel: "Red Cow",
//   image: "default.jpeg",
//   description: req.body.description,
//   views: "0",
//   likes: "0",
//   duration: "4:01",
//   video: "https://project-2-api.herokuapp.com/stream",
//   timestamp: Date.now(),
//   comments: [],
// };

//   videos.push(newVideo);

//   fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

//   res.send("Video Uploaded!");
// });

module.exports = router;
