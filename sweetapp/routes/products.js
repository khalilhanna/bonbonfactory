var express = require("express");
var router = express.Router();
const sql = require("../db");
const Joi = require("joi");
const { query } = require("express");
const validator = require("express-joi-validation").createValidator({});

//GET API to get the list of all products in inventory
router.get("/", function (req, res, next) {
  let sqlString = "select * from products";
  if (req.query && req.query.category) {
    sqlString += ` WHERE category = '${req.query.category}'`;
  }
  sql.query(sqlString, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

const validationSchema = Joi.object({
  product_name: Joi.string().min(2).max(20).required(),
  price: Joi.number().required(),
  delivery_in_days: Joi.number().required(),
  category: Joi.string().required(),
});

// POST API to create a new product
router.post("/", validator.body(validationSchema), function (req, res, next) {
  const data = req.body;
  sql.query(
    "INSERT INTO products SET ?",
    data,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// GET API to get one product by id
router.get("/:id", function (req, res, next) {
  const product = req.params;
  sql.query(
    "select * from products WHERE id= ?",
    [product.id],
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

// GET API to get one product by product name to be used in search form
router.get("/product/:name", function (req, res, next) {
  const product = req.params;
  sql.query(
    "select * from products WHERE product_name= ?",
    [product.name],
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

// PUT API to update one product by id
router.put("/:id", function (req, res, next) {
  const product = req.body;
  sql.query(
    "UPDATE products SET product_name= ?, price= ?, delivery_in_days= ?, category= ? WHERE id= ?",
    [
      product.product_name,
      product.price,
      product.delivery_in_days,
      product.category,
      req.params.id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//DELETE API to delete product by admin
router.delete("/:id", function (req, res) {
  console.log(req.params);
  const ItemId = req.params.id;
  console.log(ItemId);

  sql.query(
    "DELETE FROM products WHERE id=?",
    ItemId,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

module.exports = router;
