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
	async execute(oldChannel, newChannel) {
        try {
          //console.log(newChannel)
        var newUserChannel = newChannel.channelId //new channel
        var oldUserChannel = oldChannel.channelId //old channel
        //console.log(newUserChannel.channel.parent)
        
        if(oldUserChannel === null && newUserChannel !== null) {
            
            console.log("join " + toString(await querychannelcount(newUserChannel)));
            // User Joins a voice channel
          

        } else if(oldUserChannel !== null && newUserChannel === null){
            
            console.log("leave " + toString(await querychannelcount(oldUserChannel)));
            // User leaves a voice channel


        } else if(oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel){

          channelCreate(newChannel);
          console.log("change " + toString(await querychannelcount(newUserChannel)));
            
            // User change a voice channel

        }else if(oldUserChannel === newUserChannel){
          // Jemand macht in dem channel etwas
        }else{
              logger.warn('Cannot identify join/leave Event')
        }

		} catch (error) {
			logger.warn('Error while performing interactionCreate')
			console.log(error)
		}
	},
};

function querychannelcount(channelId){
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

function channelCreate(channelobj){
  console.log('ich bin aus')
  try {
      channelobj.clone()
    /*[console.log(channelobj.channel.permissionOverwrites.fetch)
      console.log(channelobj.channel.name)
      let test = "864160500371685396"
      let parent = channelobj.channel.parent.id
      let channel = channelobj.guild.channels.create("test-voice-anders", {
        type: "GUILD_VOICE",
        parent: parent,
        permissionOverwrites: channelobj.permissionOverwrites
            {
              id: test,
              allow: ["VIEW_CHANNEL"]
            },            
            {
            id: channelobj.guild.id,
            deny: ["VIEW_CHANNEL"],
            },
        ],
        })*/
  } catch (error) {
    console.log(error)
  }

}