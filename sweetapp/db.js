"use strict";

var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Khalil1@mysql",
  database: "bonbonfactorydb",
});

connection.connect(function (err) {
  if (err) {
    console.log("DB connection error!!!");
    throw err;
  } else {
    console.log("DB connection successful");
  }
});

module.exports = connection;
