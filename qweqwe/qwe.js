import mysql from "mysql2"
 
const connection = mysql.createConnection({
  host: "127.0.0.1 5050",
  user: "root",
  password: "123456"
});
 
connection.query("CREATE DATABASE usersdb2",
  function(err, results) {
    if(err) console.log(err);
    else console.log("База данных создана");
});
 
connection.end();
  