const mysql = require("mysql")
require("dotenv").config()

const conn = module.exports = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  debug: false
});
conn.getConnection(async function(err, conn) {
  if(err) {
    console.log(err);
    return;
  } 
  // console.log(conn);
});

// const conn = module.exports = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// conn.connect(function(err) {
//     if (err) {
//       console.error('---error connecting: ' + err.stack);
//       return;
//     }
//     console.log('---connected as id ' + connection.threadId);
//   });

console.log("DB Connection Object Created");
