const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  const farmhouses = fs.readFileSync("./data/farmhouse.json");
  res.send(JSON.parse(farmhouses));
});
router.get("/farmhouse", (req, res) => {
  const farmhouses = fs.readFileSync("./data/farmhouse.json");
  res.send(JSON.parse(farmhouses));
});

router.get("/farmhouse/:id", (req, res) => {
  const farmhouse = JSON.parse(fs.readFileSync("./data/farmhouse.json"));
  const foundfarmhouse = farmhouse.find(
    (farmhouse) => farmhouse.id == req.params.id
  );
  res.send(JSON.stringify(foundfarmhouse));
});

router.get("/farmhouse/:id/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync("./data/products.json"));
  const foundProducts = products.filter(
    (product) => product.farmhouse_id == req.params.id
  );
  res.send(JSON.stringify(foundProducts));
});

module.exports = router;
