const logger = require('./logger').log
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
var mysql = require('mysql');


//mysql v.5.5
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : role_reaction_DB_host,
    port            : role_reaction_DB_port,
    user            : role_reaction_DB_user,
    password        : role_reaction_DB_password,
    database        : role_reaction_DB_database
  });

module.exports = {
    pool,
    role_reaction_DB(){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
              logger.http(`connected to database: ${role_reaction_DB_database}`);
              var sql = "CREATE TABLE IF NOT EXISTS roles (name VARCHAR(255), id VARCHAR(255) PRIMARY KEY)";
              connection.query(sql, function (err, result) {
                connection.release();
                if (err) throw err;
                logger.http(`Table roles created in database: ${role_reaction_DB_database}`);
              });
        });
    }
}