const logger = require('../util/logger').log
const { cascadingChannels_DB_host, cascadingChannels_DB_port, cascadingChannels_DB_user, cascadingChannels_DB_password, cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');


//mysql v.5.5
var con = mysql.createConnection({
    host: cascadingChannels_DB_host, 
    port: cascadingChannels_DB_port,
    user: cascadingChannels_DB_user, 
    password: cascadingChannels_DB_password,
    database: cascadingChannels_DB_database,
});

module.exports = {
    cascadingChannels_DB(){
        con.connect(function(err) {
            if (err) throw err;
              logger.http(`connected to database: ${cascadingChannels_DB_database}`);
              var sql = "CREATE TABLE IF NOT EXISTS channels (name VARCHAR(255), id BIGINT PRIMARY KEY,  isOriginal BOOLEAN, copyOf VARCHAR(255))";
              con.query(sql, function (err, result) {
                if (err) throw err;
                logger.http(`Table channels created in database: ${cascadingChannels_DB_database}`);
              });
        });
    }
}
