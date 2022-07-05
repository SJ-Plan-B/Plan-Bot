const logger = require('../util/logger').log
const { cascadingChannels_DB_host, cascadingChannels_DB_port, cascadingChannels_DB_user, cascadingChannels_DB_password, cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');
const { Interaction, Collection, Client } = require('discord.js');

var con = mysql.createConnection({
    host: cascadingChannels_DB_host, 
    port: cascadingChannels_DB_port,
    user: cascadingChannels_DB_user, 
    password: cascadingChannels_DB_password,
    database: cascadingChannels_DB_database,
});

module.exports = {
	name: "voiceStateUpdate",
	async execute(oldState, newState) {
        try {
        var newUserChannel = newState.channelId //new channel
        var oldUserChannel = oldState.channelId //old channel
        
        if(oldUserChannel === null && newUserChannel !== null) {

            // User Joins a voice channel
            if (toString(await querychannelcount(newUserChannel)) === 1) {
              channeldupe(newState)
            } else {
             //irrelevant channel 
            }
            
          

        } else if(oldUserChannel !== null && newUserChannel === null){
          
            // User leaves a voice channel
            if (toString(await querychannelcount(oldUserChannel)) === 1) {
              channeldupe(oldState)
            } else {
             //irrelevant channel 
            }



        } else if(oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel){

            // User change a voice channel
            if (toString(await querychannelcount(newUserChannel)) === 1) {
              channeldupe(newState)
            } else {
             //irrelevant channel 
            }

        }else if(oldUserChannel === newUserChannel){

          // Jemand macht in dem channel etwas

        }else{
              logger.warn('Cannot identify join/leave Event')
        }

		} catch (error) {
			logger.warn('Error while performing JoinLeave')
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

function checkforemptychannel(channelName){
    try {
        var sql = "SELECT id FROM channels Where name = ?";
        var Inserts = [channelName]
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

async function channelCreate(voiceState){
  try {

    voiceState.channel?.clone()

  } catch (error) {
    logger.error("Error while performing channelCreate in JoinLeave")
  }

}

async function usercount(channelobj){

  let { members } = channelobj.channel;
  return members.size;

}

function splitobj(obj){
  let myJSON = JSON.stringify(obj);
  //myJSON = myJSON.replace(id,' ');
  const myArray = myJSON.split(",")
  for (let index = 0; index < Object.keys(myArray).length; index++) {

      myArray[index] = myArray[index].replace(/{"id":"/g, '');
      myArray[index] = myArray[index].replace(/"}/g, '')
  }
  myArray[0] = myArray[0].replace('[', '')
  myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')
}

async function channeldupe(voiceState){
  try {
   let channelIds = await(checkforemptychannel(voiceState.channel.name))
   console.log(channelIds);
   splitobj(channelIds)
  } catch (error) {
    logger.error("Error while performing channeldupe in JoinLeave")
    console.log(error)
  }

}
