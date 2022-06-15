const logger = require('../util/logger').log
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
	async execute(oldstate, newstate,) {
        try {
            
        var newUserChannel = newstate.channelId //new channel
        var oldUserChannel = oldstate.channelId //old channel

        if(oldUserChannel === null && newUserChannel !== null) {
            
            console.log("join " + toString(await querychannel(newUserChannel)));
            // User Joins a voice channel
     

        } else if(oldUserChannel !== null && newUserChannel === null){
            
            console.log("leave " + toString(await querychannel(oldUserChannel)));
            // User leaves a voice channel


        } else if(oldUserChannel !== null && newUserChannel !== null){

            console.log("change " + toString(await querychannel(newUserChannel)));

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
          var sql = "SELECT COUNT(id)*10 FROM channels Where id = ?";
          var Inserts = [channelId]
          sql = mysql.format(sql, Inserts);
          return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                return err ? reject(err) : resolve(result);
              }
            );
          }
        );
      } catch (error) {
      logger.error(`Error while performing 'SELECT' in the database: ${cascadingChannels_DB_database}, in Event JoinLeave`); 
      }	
  };

function toString(object) {
    let ergebnis = (JSON.stringify(object).length-20)
    return ergebnis;
  }