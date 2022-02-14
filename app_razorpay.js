const bodyParser = require("body-parser");
const express = require('express');
// Copy the .env.example in the root into a .env file in this folder
require('dotenv').config({ path: './.env' });

const app = express();
const port = 3000;
const Razorpay = require('razorpay');

app.use(require('body-parser').json());
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
    headers: {
      "X-Razorpay-Account": ""
    },
    authorization: {
        username: "",
        password: "",
    }
});
app.get('/',(req,res)=>{
    res.sendFile('standard.html',{root: __dirname});
});
app.post('/create/orderId',(req,res)=>{
    console.log('create order_id requirest',req.body);
    var options = {
        amount: "100",//req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 1,
        notes: {
            key1: "value3",
            key2: "value2"
        },
      };
      instance.orders.create(options, function(err, order) {
          console.log(order);
          res.send({orderId: order.id})
      });
    //  Fetch Orders
    //  instance.orders.fetch(orderId);
    //  instance.orders.fetchPayments(orderId);
    //  instance.orders.all().then(console.log).catch(console.error);
    //  Fetch Payments
    //  instance.payments.fetch(paymentId);
    // instance.payments.all({
    //     from: '2016-08-01',
    //     to: '2016-08-20'
    //   }).then((response) => {
    //     // handle success
    //   }).catch((error) => {
    //     // handle error
    //   });//same as below method (promiss and callback)
    // instance.payments.all({
    //     from: '2016-08-01',
    //     to: '2016-08-20'
    //   }, (error, response) => {
    //     if (error) {
    //       // handle error
    //     } else {
    //       // handle success
    //     }
    //   });//same as above method (promiss and callback)
    //  Success Callback, (Store Fields in Server)
    //   {
    //     "razorpay_payment_id": "pay_29QQoUBi66xm2f",
    //     "razorpay_order_id": "order_9A33XWu170gUtm",
    //     "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
    //   }
})
app.post("/api/payment/verify",(req,res)=>{ 
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;  
    var crypto = require("crypto");  
    var expectedSignature = crypto.createHmac('sha256', 'Wok5mJv2F0pa5HKLeXZfUr9r')                                  
    .update(body.toString())                                  
    .digest('hex');                                  
    console.log("sig received " ,req.body.response.razorpay_signature);                                  
    console.log("sig generated " ,expectedSignature);  
    var response = {"signatureIsValid":"false"};  
    if(expectedSignature === req.body.response.razorpay_signature)   
    response={"signatureIsValid":"true"}      
    res.send(response);  
});
// call with following request from client
// var settings = {
//     "url": "/api/payment/verify",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Content-Type": "application/json"
//     },
//     "data": JSON.stringify({response}),
//   }

/**
 * Card Network
Domestic / International
Card Number
Mastercard
Domestic
5104 0600 0000 0008
Visa
Domestic
4111 1111 1111 1111
Mastercard
International
5555 5555 5555 4444
5105 1051 0510 5100
Visa
International
4012 8888 8888 1881
4000 1841 8621 8826
 */

app.listen(port, () => {  
        console.log(`App is listening on port:${port}`)});

