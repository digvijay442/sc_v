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
    // console.log(rows);
    res.render('index', { products : rows });
  })
});

var orderDetails;
router.get('/viewcart', function(req, res){
  console.log('orderDetails.length' - orderDetails.length)
  res.render('view_cart', {orderDetails : orderDetails});
})

router.post('/viewcart', function(req, res){
  var cartDetails = req.body.cartDetails;
  var tempTab = "TRUNCATE TABLE temp;";
  var insertCart = "insert into temp(id, name, imgsrc, price) values(?, ?, ?, ?)";
  var selectCart = "SELECT id, name, imgsrc, price, COUNT(id) AS quantity, (price * COUNT(id)) AS sub_total FROM temp GROUP BY id;";
  connection.query(tempTab);
  cartDetails.forEach(el => {
    connection.query(insertCart,[el.productId, el.name, el.imgSrc, el.price])
  });
    /* send order details to view cart page*/
  connection.query(selectCart, function(err, rows){
    if(err) throw err;
    if(rows.length){
      orderDetails = rows;
      res.send({redirect : '/viewcart'})
    } else {
      res.send('No item in cart');
    }
  })
});


router.get('/checkout', function(req, res){
  res.render('checkout', {orderDetails : orderDetails});
  // res.send('checkout page')
})

module.exports = router;
