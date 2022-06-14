const logger = require('../util/logger').log
const client = require('../index')
const { cascadingChannels_DB_host, cascadingChannels_DB_port, cascadingChannels_DB_user, cascadingChannels_DB_password, cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: cascadingChannels_DB_host, 
    port: cascadingChannels_DB_port,
    user: cascadingChannels_DB_user, 
    password: cascadingChannels_DB_password,
    database: cascadingChannels_DB_database,
});

module.exports = {
	name: "voiceStateUpdate",
	execute(oldstate, newstate,) {
        try {
            
        var newUserChannel = newstate.channelId //new channel
        var oldUserChannel = oldstate.channelId //old channel

        if(oldUserChannel === null && newUserChannel !== null) {
            
            let isRelevent = querychannel(newUserChannel);
            console.log("Joins "+ isRelevent);
            // User Joins a voice channel
     

        } else if(oldUserChannel !== null && newUserChannel === null){
            
            let isRelevent = querychannel(newUserChannel);
            console.log("leaves "+ isRelevent);
            // User leaves a voice channel


        } else if(oldUserChannel !== null && newUserChannel !== null){
            console.log(querychannel(newUserChannel))
            let ergebnis = JSON.stringify()
            let ichhassemeinleben = (ergebnis.length)
            let ichhasseauchmeinleben = (ichhassemeinleben-20)
            console.log("change " + ichhasseauchmeinleben);
            // User change a voice channel

        }else{
            logger.warn('Cannot identify join/leave Event')
        }

		} catch (error) {
			logger.warn('Error while performing interactionCreate')
			console.log(error)
		}
	},
};

function querychannel(channelId){
      try {
          // read if Chanel id exists
          //var sql = "SELECT COUNT(id) FROM channels Where id = ?";
          var sql = "SELECT COUNT(id)*10 FROM channels Where id = ?";
          var Inserts = [channelId]
          sql = mysql.format(sql, Inserts);
          con.query(sql, function (err, result) {
              if (err) throw err;
                logger.http(`into database: ${cascadingChannels_DB_database}, table: channels`)
                return result;
          });
          
          
      } catch (error) {
      logger.error(`Error while performing the database: ${cascadingChannels_DB_database}, Conection in addchannlcascade`); 
      }	
  };

  function fetchID(data, callback) {
    connection.query('SELECT id_user FROM USERS WHERE username = ?', data.username, function(err, rows) {
        if (err) {
            callback(err, null);
        } else 
            callback(null, rows[0].id_user);
    });
}
