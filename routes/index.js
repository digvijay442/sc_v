var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var flash = require('connect-flash');
var dbconfig = require('../config/dbconnection');
var connection = mysql.createConnection(dbconfig.connection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = 'select * from product_details;';
  connection.query(products, function(err, rows){
    if(err) throw err;
    console.log(rows);
    res.render('index', { rows: rows });
  })
});

module.exports = router;
