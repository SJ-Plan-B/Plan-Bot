const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log;
const { cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');
var db = require('../util/cascadingChannels_DB')

var pool = db.pool

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('listchanneldupe')
		.setDescription('List of channels to be duplicated.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
          interaction.reply('Channels to be duplicated: \n'+'\`' + splitObjIntoArrayOfString(await(getchannellist())).join(`\n`) + '\`');
		}catch(error){
			logger.error('Error while performing listchanneldupe.'); 
		}
  
  },
};
function getchannellist(){
    try {
        var sql = "SELECT DISTINCT name FROM channels";
        sql = mysql.format(sql);
        return new Promise((resolve, reject) => {
          pool.query(sql, (err, result) => {
              return err ? reject(err) : resolve(result);
            }
          );
        }
      );
    } catch (error) {
    logger.error(`Error while performing 'SELECT' in the database: ${cascadingChannels_DB_database}, in listchanneldupe.`); 
    }	
};

function splitObjIntoArrayOfString(obj){

    let myJSON = JSON.stringify(obj);
    let myArray = myJSON.split(",")
  
    for (let index = 0; index < Object.keys(myArray).length; index++) {
        myArray[index] = myArray[index].replace(/{"name":"/, '')
        myArray[index] = myArray[index].replace(/"}/g, '')
    }
  
    myArray[0] = myArray[0].replace('[', '')
    myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')
    return myArray;
  }
