'use strict';
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mysql = require("mysql");
var admin = require("firebase-admin");
var serviceAccount = require("../../giggle-2022-firebase-adminsdk-6nk6l-7cf7b248eb.json");
const demoUrls ='https://brandhype.co.in/bumaco/uploads/20211027131025_557455.jpg';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   // credential: admin.credential.applicationDefault(),
//   // credential: admin.credential.refreshToken(refreshToken),

//   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
// This registration token comes from the client FCM SDKs.
const registrationToken = 'eYQkjq1CRsKi7xmEC6I8zc:APA91bGmkKtzr_6Hs-hMHX-oF-K3zjJ8ohRxZghsiIcrQ0kB-zfFTz7CCCu6W_b4HQNvLfkNmpz46aKV5iJBW954l5kX4nLbSdDzmTbeTqJxS1UPaRN90FOLC3n9U_FA4OAImQgKJ57p';
// Create a list containing up to 500 registration tokens.
// These registration tokens come from the client FCM SDKs. 
// const registrationTokens = [
//   'YOUR_REGISTRATION_TOKEN_1',
//   // …
//   'YOUR_REGISTRATION_TOKEN_N',
// ];
// const topic = 'highScores';
// const condition = '\'stock-GOOG\' in topics || \'industry-tech\' in topics';
const payload = {
  data: {
    score: '850',
    time: '16:22'
  },
  notification: {
    title: 'Upto 50% Off on Hair Care',
    body: 'Shop from Naturals, L\'Oreal Professionnel, WOW!'
  },
  token: registrationToken,
  // topic: topic,
  // condition: condition
  android: {
    ttl: 3600000,
    notification: {
      imageUrl: demoUrls,
      icon: 'stock_ticker_update',
      color: '#7e55c3',
      clickAction: 'news_intent',
      bodyLocKey: 'STOCK_NOTIFICATION_BODY',
      bodyLocArgs: ['Brandhype', '11.80', '835.67', '1.43']
    }
  },
  apns: {
    payload: {
      aps: {
        'mutable-content': 1,
        'category': 'INVITE_CATEGORY'
      }
    },
    fcm_options: {
      image: demoUrls
    }
  },
  webpush: {
    headers: {
      image: demoUrls
    },
    fcmOptions: {
      link: 'breakingnews.html'
    }
  },
};
/****************
admin.messaging().sendMulticast(payload)
  .then((response) => {
    console.log(response.successCount + ' messages were sent successfully');
if (response.failureCount > 0) {
  const failedTokens = [];
  response.responses.forEach((resp, idx) => {
    if (!resp.success) {
      failedTokens.push(registrationTokens[idx]);
    }
  });
  console.log('List of tokens that caused failures: ' + failedTokens);
  };
});

/************** 
// Create a list containing up to 500 messages.
const messages = [];
messages.push({
  notification: { title: 'Price drop', body: '5% off all electronics' },
  token: registrationToken,
});
messages.push({
  notification: { title: 'Price drop', body: '2% off all books' },
  topic: 'readers-club',
});

admin.messaging().sendAll(payload)
  .then((response) => {
    console.log(response.successCount + ' messages were sent successfully');
  });
***********************/

// Set the message as high priority and have it expire after 24 hours.
// const options = {
//   priority: 'high',
//   timeToLive: 60 * 60 * 24
// };
// admin.messaging().sendToDevice(registrationToken, payload, options)
  admin.messaging().send(setNotificationMessage(
      'Someone giggled yoy!',
      'WOW! What would be yor reaction?', 
      demoUrls)
  )
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

//---------------------------------------------------------------

var con = require("../../config/db.js");
var app_const = require("../../config/app_const.js");
const {
  cache
} = require('ejs');
const {
  response
} = require('express');

function setNotificationMessage(titleStr, messageStr, imgUrl){
  console.log(imgUrl);
const payload = {
  data: {
    score: '850',
    time: '16:22'
  },
  notification: {
    title: titleStr,
    body: messageStr,
  },
  token: registrationToken,
  // topic: topic,
  // condition: condition
  android: {
    ttl: 3600000,
    notification: {
      imageUrl: imgUrl,
      icon: 'stock_ticker_update',
      color: '#7e55c3',
      clickAction: 'news_intent',
      bodyLocKey: 'STOCK_NOTIFICATION_BODY',
      bodyLocArgs: ['Brandhype', '11.80', '835.67', '1.43']
    }
  },
  apns: {
    payload: {
      aps: {
        'mutable-content': 1,
        'category': 'INVITE_CATEGORY'
      }
    },
    fcm_options: {
      image: imgUrl
    }
  },
  webpush: {
    headers: {
      image: imgUrl
    },
    fcmOptions: {
      link: 'breakingnews.html'
    }
  },
};
return payload;
}
exports.sendNotification = function (req, res) {
  var post = {
    a: req.body.title,
    b: req.body.message,
    c: req.body.image,
  }
  var titleStr = post.a;
  var messageStr = post.b;
  var imageStr = post.c;
  if (typeof titleStr !== 'undefined' && titleStr) {
  } else {
    titleStr = req.query.title;
    messageStr = req.query.message;
    imageStr = req.query.image;
  }
  if(typeof titleStr == 'undefined') {
    titleStr = 'Title not provided';
  }
  if(typeof messageStr == 'undefined') {
    messageStr = 'Message not provided';
  }
  if(typeof imageStr == 'undefined') {
    imageStr = demoUrls;
  }

  const payload = setNotificationMessage(titleStr, messageStr, imageStr);
  admin.messaging().send(payload)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    res.json({
      code: 200,
      status: true,
      message: 'success',
      data: response
    });
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    res.json({
      code: 500,
      status: false,
      message: "Internal server error: " + error.code,
      data: []
    });
  });
}

exports.userFind = function (req, res) {
  var post = {
    a: req.body.column_name,
    b: req.body.find_by,
  }
  var table = [app_const.tuser, post.a, post.b];
  var query = mysql.format(app_const.qwhere, table);
  console.log(query);

  con.query(query, async function (err, rows) {
    if (err) {
      res.json({
        code: 500,
        status: false,
        message: "Internal server error: " + err.code,
        data: []
      });
    } else {
      console.log(rows)
      res.json({
        code: 200,
        status: true,
        message: 'success',
        data: rows
      });
    }
  });
}

exports.bannerList = async function (req, res) {
  var table = [app_const.tbannerslider];
  var query = mysql.format(app_const.q_select, table);
  console.log(query);

  con.query(query, async function (err, rows) {
    if (err) {
      res.json({
        code: 500,
        status: false,
        message: "Internal server error: " + err.code,
        data: []
      });
    } else {
      console.log(rows)
      res.json({
        code: 200,
        status: true,
        message: 'success',
        data: rows
      });
    }
  });
}

exports.productList = async function (req, res) {
  var table = [app_const.tproduct];
  var query = mysql.format(app_const.q_select, table);
  console.log(query);

  con.query(query, async function (err, rows) {
    if (err) {
      res.json({
        code: 500,
        status: false,
        message: "Internal server error: " + err.code,
        data: []
      });
    } else {
      console.log(rows)
      res.json({
        code: 200,
        status: true,
        message: 'success',
        data: rows
      });
    }
  });
}

exports.userList = async function (req, res) {
  var table = [app_const.tuser];
  var query = mysql.format(app_const.q_select, table);
  console.log(query);

  con.query(query, async function (err, rows) {
    if (err) {
      res.json({
        code: 500,
        status: false,
        message: "Internal server error: " + err.code,
        data: []
      });
    } else {
      // console.log(rows)
      res.json({
        code: 200,
        status: true,
        message: 'success',
        data: rows
      });
    }
  });
}

exports.userAdd = function (req, res) {
  var data = {
    ...req.body
  }
  data.picture = '';
  data.user_photo = '';
  data.user_otp = '2222';
  data.sex = 'm';
  data.user_type = '0';
  data.user_mobile_verified = '1';
  data.user_active = '1';
  data.user_remark = '';
  data.country = 'India';
  data.locality = 'na';
  data.user_lat = '';
  data.user_lng = '';
  data.created_at = Date();

  console.log(data.created_at);
  var table = [app_const.tuser];
  var query = mysql.format(app_const.qinsert, table);
  console.log(query);
  con.query(query, data, async function (err, rows) {
    if (err) {
      console.log(err);
      res.json({
        code: 500,
        status: false,
        message: "Internal server error: " + err.code,
        data: []
      });
    } else {
      console.log(rows)
      res.json({
        code: 200,
        status: true,
        message: 'Inserted successfully!',
        data: rows
      });
    }
  });
}

exports.userUpdate = function (req, res) {
  var post = {
    a: req.body.column_name,
    b: req.body.find_by,
  }
  var table = [app_const.tuser, post.a, post.b];
  var query = mysql.format(app_const.qwhere, table);
  console.log(query);

  con.query(query, async function (err, rows) {
    if (err) {
      res.json({
        code: 500,
        status: false,
        message: "Failed to add user!",
        data: []
      });
    } else {
      console.log(rows)
      res.json({
        code: 200,
        status: true,
        message: 'success',
        data: rows
      });
    }
  });
}

exports.userLogin = function (req, res) {
  var post = {
    password: req.body.password,
    mobile: req.body.mobile,
  }
  var table = [app_const.tuser, "user_mobile", post.mobile];
  var query = mysql.format(app_const.qwhere, table);
  console.log(query);

  con.query(query, async function (err, results) {
    if (err) {
      res.json({
        code: 500,
        status: false,
        message: "Internal server error!",
        data: '',
        currUser: ''
      });
    } else {
      var data;
      if (results.length > 0) {
        console.log(results[0]);
        var token = jwt.sign(results, app_const.secret, {
          expiresIn: 14400
        });
        // bcrypt.genSalt(app_const.saltRounds, function (err, salt) {
        //   if (err) {
        //     throw err
        //   } else {
        //     bcrypt.hash(post.password, salt, function (err, hash) {
        //       if (err) {
        //         throw err
        //       } else {
        //         console.log("---->>>"+hash)
        //         //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
        //       }
        //     })
        //   }
        // })
        bcrypt.compare(post.password, results[0].password, function (err, isMatch) {
          if (err) {
            res.json({
              code: 500,
              status: false,
              message: "Encrypt error!",
              data: '',
              currUser: ''
            });
          } else if (isMatch) {
            res.json({
              code: 200,
              status: true,
              message: 'Login successful!',
              data: token,
              currUser: results[0].user_id
            });
          } else {
            res.send({
              code: 204,
              status: false,
              message: 'Password does not match!',
              data: '',
              currUser: ''
            })
          }
        })
        data = {
          user_id: results[0].user_id,
          user_mobile: post.mobile,
          device_type: "android", //results[0].device_type,
          access_token: token,
          device_token: results[0].device_token,
          ip_address: results[0].ip_address
        }
      } else {
        res.send({
          code: 206,
          status: false,
          message: 'Mobile number not registered, please contact admin to register first.',
          data: '',
          currUser: ''
        });
        //Inserting login information for record---------
        data = {
          user_id: 0,
          user_mobile: post.mobile,
          device_type: "android", //results[0].device_type,
          access_token: 'mobile num not found',
          device_token: '---------',
          ip_address: '0.0.0.0'
        }
      }
      var table = [app_const.tatoken];
      var query = mysql.format(app_const.qinsert, table);
      con.query(query, data, function (err, rows) {
        if (err) {
          console.log('Error: ' + err);
        } else {
          console.log('Login info inserted successfully!');
        }
      });
    }
  });
}