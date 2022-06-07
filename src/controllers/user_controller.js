'use strict';
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mysql = require("mysql");
var admin = require("firebase-admin");
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
var serviceAccount = require("../../giggle-2022-firebase-adminsdk-6nk6l-7cf7b248eb.json");
const demoUrls ='https://brandhype.co.in/bumaco/uploads/20211027131025_557455.jpg';
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;
console.log(date);
    
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
var amPm = 'PM'
  
// year + "-" + month + "-" + day + " " +  
var dateTime = 
hours + ":" + minutes + " " + amPm;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   // credential: admin.credential.applicationDefault(),
//   // credential: admin.credential.refreshToken(refreshToken),

//   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
// This registration token comes from the client FCM SDKs.
const aRegistrationToken = 'e5csMk2VQr2ZNznWRU6MoG:APA91bHmvgTKCUkJcml9esO-9b9s6bosX3hLzGtkO9BFfL9mH0sv9WGV-armtw9Dik0ryhdObdBuO09ZRZnmR1aqgnka1stz2wWucVSBTvpwCzFrPInhAeb1aktzA_hm3zjwr7HgvKOJ';
const iRegistrationToken = 'eS_Kyj3dtEd5mjxM8XVxh5:APA91bHyRt33PtoNe7VOYqaYRAUgX3BF3eWNJ9zGzXPgmhuYOT3f7HymkqTUEvofKxuEdQhHuUns10eRP_Vgm_nkOnnA7M81MJNCVETK6Z_umH8c9CCiK8pJ6xCR07qdg8X-DoMBqVsB';
const iRegistrationToken1 = 'dTolLSE6kkucnuRcO0uG0Y:APA91bExt8Sq5dyamiX1Wvh97tbF7oJJH3bfEwU_tpBPXyZrVvKME6azqVCHgipC5l54Jh6zE13MOHHsckvIwPDZWHbj1fHWPWdKW7dYJFljbSWRt52kGgDnXiOwq3Lrc5WYqcZ8ZbF2';
const iRegistrationToken2 = 'cD466E7Ob0-LkzjWKL5ick:APA91bHSUtHzuCj0s-1bV3Jmh_Blu3OCsAvt672d20_ildTQQ6UqKpKmHMee42Ml9FfEudO9so6uOHqD7omutbxtFIEFvYS4MX65qKVgobtfhm8kHcdQcFn_bNjqHPOv2MUwArwDnxPk';
const iPraveenToken = 'detVvjOZykYUloZ0c8wouZ:APA91bGMpsSPy1dchuGowzaB3v9gKSml65nchnDgM1J0lFy4NfKlWEDcpsCA0HED-fBl2wolpnB3AA3quZ76tD-NvfTI97YjKFKsN480_ANKru6D8Ibzs5-c92DG8YKsQT6uiI1iX0e7';
// var currentAction = 'PROFILE_COMPLETE_VERIFICATION';
// var currentAction = 'PROFILE_ACTIVATED';
// var currentAction = 'LIKE';
var currentAction = 'CONNECTION';
// var currentAction = 'MESSAGE';
// var currentAction = 'PROFILE_DEACTIVATED';
// var currentAction = '';
// var currentAction = '';
// var currentAction = '';
// var currentAction = '';

// Create a list containing up to 500 registration tokens.
// These registration tokens come from the client FCM SDKs. 
const registrationTokens = [
  aRegistrationToken,
  // iRegistrationToken,
  // iRegistrationToken1,
  // iRegistrationToken2,
  iPraveenToken,
];
const topic = 'all';
const condition = '\'stock-GOOG\' in topics || \'industry-tech\' in topics';
const payload = {
  data: {
    id: uuidv1(),
    user_id: '200',
    score: '850',
    time: dateTime,
    index: '1',
    action: currentAction,
    title: 'Upto 50% Off on Hair Care',
    body: 'Shop from Naturals, L\'Oreal Professionnel, WOW!',
  },
  topic: topic,
  condition: condition,
  notification: {
    "content_available": false,
    title: 'Upto 50% Off on Hair Care',
    body: 'Shop from Naturals, L\'Oreal Professionnel, WOW!',
    android_channel_id: "high_importance_channel"
  },
  token: iRegistrationToken,
  android: {
    ttl: 3600000,
    notification: {
      // imageUrl: demoUrls,
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
        // topic: 'topic',
        // environment: Environment.development
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
  admin.messaging().sendMulticast(setNotificationMessage(
      'Someone giggled yoy!!',
      'WOW! What would be yor reaction??', 
      demoUrls, iRegistrationToken)
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

function setNotificationMessage(titleStr, messageStr, imgUrl, tokenId) {//testing notification
  console.log(imgUrl);
const payload = {
  data: {
    id: uuidv1(),
    user_id: '201',
    time: dateTime,
    score: '850',
    index: '1',
    action: currentAction,
    title: 'Upto 50% Off on Hair Care..',
    body: 'Shop from Naturals, L\'Oreal Professionnel, WOW!',
  },
  topic: topic,
  condition: condition,
  notification: {
    title: titleStr,
    body: messageStr,
  },
  tokens: registrationTokens,
  // token: tokenId,
  android: {
    // "ttl":"86400s",
    ttl: 3600000,
    notification: {
      // imageUrl: imgUrl,
      icon: '@drawable/ic_stat_giggle',
      color: '#7e55c3',
      clickAction: 'DEFAULT_EVENT_ACTION',
      bodyLocKey: 'STOCK_NOTIFICATION_BODY',
      bodyLocArgs: ['Brandhype', '11.80', '835.67', '1.43'],
      channelId: "high_importance_channel"
    }
  },
  apns: {
    headers: {
      "apns-priority": "5",
    },
    payload: {
      aps: {
        // alert: {
        //   locKey: 'STOCK_NOTIFICATION_BODY',
        //   locArgs: ['FooCorp', '11.80', '835.67', '1.43']
        // },
        "alert": {
          "title": "Someone giggled yoy!!",
          "body": "WOW! Let's open app and check whose this! 🎉",
          // "sound": "default"
        },
        // "alert" : "Notification test",
        "badge" : 9,
        "sound" : "default",
        // "mutable-content" : false,
        'mutable-content': 1,
        // category:'INVITE_CATEGORY',
        // topic: topic,
        // environment: Environment.development,
        // environment: 'development'
      },
      "image_url": imgUrl,
      // "event_type": "file_added",
      // "Simulator Target Bundle": "com.brandhype.giggle",
      // "gcm.message_id": "123",
      // "example-data-key": "example-data-value"
    },
    fcm_options: {
      image: imgUrl
    }
  },
  webpush: {
    headers: {
      ttl:"86400",
      image: imgUrl
    },
    fcmOptions: {
      link: 'breakingnews.html'
    }
  },
};
return payload;
}
exports.sendNotification = function (req, res) {//notif-api
  var post = {
    a: req.body.title,
    b: req.body.message,
    c: req.body.image,
    d: req.body.token,
  }
  var titleStr = post.a;
  var messageStr = post.b;
  var imageStr = post.c;
  var tokenStr = post.d;
  if (typeof titleStr !== 'undefined' && titleStr) {
  } else {
    titleStr = req.query.title;
    messageStr = req.query.message;
    imageStr = req.query.image;
    tokenStr = req.query.token;
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
  if(typeof tokenStr == 'undefined') {
    tokenStr = iRegistrationToken;
  }

  const payload = setNotificationMessage(titleStr, messageStr, imageStr, tokenStr);
  admin.messaging().sendMulticast(payload)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log('List of tokens that caused failures: ' + failedTokens);
    }
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