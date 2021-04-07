var express = require("express");
var router = express.Router();
const sql = require("../db");
const Joi = require("joi");
const { query } = require("express");
const validator = require("express-joi-validation").createValidator({});

const validationSchema = Joi.object({
  Item_name: Joi.string().min(2).max(20).required(),
  price: Joi.number().required(),
});

// GET API to get all items in the cart
router.get("/", function (req, res, next) {
  let sqlString = "select * from cart_items";

  sql.query(sqlString, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET API to get the count of items and the total price in the cart
router.get("/count", function (req, res, next) {
  let sqlString =
    "select COUNT(id) AS counts, SUM(price) AS total from cart_items";

  sql.query(sqlString, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// POST API to create a new item in the cart
router.post("/", validator.body(validationSchema), function (req, res, next) {
  const data = req.body;
  sql.query(
    "INSERT INTO cart_items SET ?",
    data,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//PATCH API to update the quantity and the price in the cart
router.patch("/:id", function (req, res, next) {
  const item = req.body;
  sql.query(
    "UPDATE cart_items SET price=?, quantity= ? WHERE id= ?",
    [item.price, item.quantity, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//DELETE API from the cart
router.delete("/:id", function (req, res) {
  console.log(req.params);
  const ItemId = req.params.id;
  console.log(ItemId);

  sql.query(
    "DELETE FROM cart_items WHERE id=?",
    ItemId,
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

module.exports = router;
