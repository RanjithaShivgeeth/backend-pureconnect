const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.send("Hello API routes");
});

router.get("/products", (req, res) => {
  const products = fs.readFileSync("./data/products.json");
  res.send(JSON.parse(products));
});

router.get("/products/:id", (req, res) => {
  const products = JSON.parse(fs.readFileSync("./data/products.json"));
  const foundProduct = products.find((product) => product.id == req.params.id);
  console.log(req.params.id);
  console.log(products);
  res.send(JSON.stringify(foundProduct));
});

// router.post("/movies", (req, res) => {
//   res.send("Hello API movies post");
// });

module.exports = router;
