//mysql v.5.5
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'host', 
    port: 'port',
    user:'user', 
    password: 'password',
    database:  'database',
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS channels (name VARCHAR(255), id VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });