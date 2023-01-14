const logger = require('../util/logger').log
const { cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');
var db = require('../util/cascadingChannels_DB')

var pool = db.pool

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
            if (toString(await querychannelcount(newUserChannel)) === 0 && toString(await querychannelcount(oldUserChannel)) === 0){
              
            // irelvent zu irelevant

            }else if(toString(await querychannelcount(newUserChannel)) === 0 && toString(await querychannelcount(oldUserChannel)) === 1){
              
             channeldupe(oldState)

            }else if(toString(await querychannelcount(newUserChannel)) === 1 && toString(await querychannelcount(oldUserChannel)) === 0){

              channeldupe(newState)

            }else if (toString((await querychannelcount(oldUserChannel)) === 1 && toString(await querychannelcount(newUserChannel)) === 1) && oldState.channel.name !== newState.channel.name){

              channeldupe(newState)
              channeldupe(oldState)

            }else if(toString((await querychannelcount(oldUserChannel)) === 1 && toString(await querychannelcount(newUserChannel)) === 1) && oldState.channel.name == newState.channel.name){

              channeldupe(oldState)

            }else{
              logger.error('JoinLeave check invalide ')
            }

        }else if(oldUserChannel === newUserChannel){

          // Jemand macht in dem channel etwas

        }else{
              logger.warn('Cannot identify join/leave Event')
        }

		}catch (error) {
			logger.error('Error while performing JoinLeave')
		}
	},
};

async function channeldupe(voiceState){
  try {  
  if (await(checkForCloneOf(voiceState.channel.name) !== null)){ 
   var channelIds = splitObjIntoArrayOfString(await(checkForCloneOf(voiceState.channel.name)))
   var emptyChannelsId = []

   for (let index = 0; index < Object.keys(channelIds).length; index++) {
    if (await(userCountByID(voiceState, channelIds[index])) === 0) {
      emptyChannelsId[index] = channelIds[index]
    } else {
      //Not Relevent
    } 
   }

   var emptyChannelsId = emptyChannelsId.filter(function (el) {return el != null;});

   if (emptyChannelsId.length < 1) {
    channelCreate(voiceState)
   }else if(emptyChannelsId.length === 1){
    logger.silly("all fine")
   }else if(emptyChannelsId.length > 1){
    for (let index = 1; index < emptyChannelsId.length; index++) {
      channelDelete(voiceState, emptyChannelsId[index])
    }
  }else {
    logger.error("strange channel behaivor in JoinLeave")
   }} 

  } catch (error) {
    logger.error("Error while performing channeldupe in JoinLeave")
  }
}

function querychannelcount(channelId){
      try {
          var sql = "SELECT COUNT(id)*10 FROM channels Where id = ?";
          var Inserts = [channelId]
          sql = mysql.format(sql, Inserts);
          return new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
                return err ? reject(err) : resolve(result) ;
              }
            );

          }
          
        );
      } catch (error) {
      logger.error(`Error while performing 'SELECT' in the database: ${cascadingChannels_DB_database}, in Event JoinLeave`); 
      }	
  };

function checkForCloneOf(channelName){
    try {
        var sql = "SELECT id FROM channels Where name = ?";
        var Inserts = [channelName]
        sql = mysql.format(sql, Inserts);
        return new Promise((resolve, reject) => {
          pool.query(sql, (err, result) => {
              return err ? reject(err) : resolve(result);
            }
          );
        }
      );
    } catch (error) {
    logger.error(`Error while performing 'SELECT' in the database: ${cascadingChannels_DB_database}, in Event JoinLeave`); 
    }	
};

function addChannel(name, channelid){
  try {
    var sql = "INSERT INTO  channels (name, id) SELECT * FROM ( SELECT ? AS channelName, ?) AS dataQuery ON DUPLICATE KEY UPDATE name=channelName";
    var Inserts = [name, channelid,]
    sql = mysql.format(sql, Inserts);
    pool.query(sql, function (err, result) {
      if (err) throw err;
      logger.http(`Inserted a new chanel into database: ${cascadingChannels_DB_database}, table: channels`)
          }
        );
  } catch (error) {
  logger.error(`Error while performing 'Insert' in the database: ${cascadingChannels_DB_database}, in Event JoinLeave`); 
  }	
};

function removeChannel(channelid){
  try {
      var sql = "DELETE FROM channels Where id = ?";
      var Inserts = [channelid]
      sql = mysql.format(sql, Inserts);
      return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            return err ? reject(err) : resolve(result);
          }
        );
      }
    );
  } catch (error) {
  logger.error(`Error while performing 'DELETE' in the database: ${cascadingChannels_DB_database}, in Event JoinLeave`); 
  }	
};

function toString(object) {
    let ergebnis = (JSON.stringify(object).length-20)
    return ergebnis;
  }  

async function channelCreate(voiceState){
  try {

    let newChannel = await(voiceState.channel?.clone())
    addChannel(newChannel.name, newChannel.id)

  } catch (error) {
    logger.error("Error while performing channelCreate in JoinLeave")
  }

}

async function channelDelete(voiceState, channelId){
  try {
    let {guild} = voiceState;
    let voiceChannel = await guild.channels?.fetch(channelId, { force: true });
    let deltedChannel = await voiceChannel.delete();

    removeChannel(deltedChannel.id)
  } catch (error) {
    logger.error("Error while performing channelDelete in JoinLeave")
  }
}


function splitObjIntoArrayOfString(obj){

  let myJSON = JSON.stringify(obj);
  let myArray = myJSON.split(",")

  for (let index = 0; index < Object.keys(myArray).length; index++) {
      myArray[index] = myArray[index].replace(/{"id":"/g, '');
      myArray[index] = myArray[index].replace(/"}/g, '')
  }

  myArray[0] = myArray[0].replace('[', '')
  myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')
  return myArray;
}

async function userCountByID(voiceState, channelId){
  try {
   
    let {guild} = voiceState;
    let voiceChannel = await guild.channels?.fetch(channelId, { force: true });

    return voiceChannel.members?.size;
  } catch (error) {
    logger.error('Error while performing usercount');
    console.log(error);
  }
}