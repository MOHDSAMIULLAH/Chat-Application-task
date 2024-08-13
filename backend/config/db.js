const mysql = require("mysql2");

//MySQL
const mysqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "chatDB",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err, "Error connecting to MySQL");
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = mysqlConnection;