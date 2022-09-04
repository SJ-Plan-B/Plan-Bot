const logger = require('./logger').log
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
var mysql = require('mysql');


//mysql v.5.5
var con = mysql.createConnection({
    host: role_reaction_DB_host, 
    port: role_reaction_DB_port,
    user: role_reaction_DB_user, 
    password: role_reaction_DB_password,
    database: role_reaction_DB_database,
});

module.exports = {
    role_reaction_DB(){
        con.connect(function(err) {
            if (err) throw err;
              logger.http(`connected to database: ${role_reaction_DB_database}`);
              var sql = "CREATE TABLE IF NOT EXISTS roles (name VARCHAR(255), id VARCHAR(255) PRIMARY KEY)";
              con.query(sql, function (err, result) {
                if (err) throw err;
                logger.http(`Table channels created in database: ${role_reaction_DB_database}`);
              });

            con.end(function(err) {
			logger.http(`a Connection to database: ${role_reaction_DB_database} has been terminated`)})
        });
    }
}
