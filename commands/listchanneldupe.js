const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log;
const { cascadingChannels_DB_host, cascadingChannels_DB_port, cascadingChannels_DB_user, cascadingChannels_DB_password, cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: cascadingChannels_DB_host, 
    port: cascadingChannels_DB_port,
    user: cascadingChannels_DB_user, 
    password: cascadingChannels_DB_password,
    database: cascadingChannels_DB_database,
});

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('listchanneldupe')
		.setDescription('list channel dupe')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
          interaction.reply('Diese Channel werden dupliziert \n'+'\`' + splitObjIntoArrayOfString(await(getchannellist())).join(`\n`) + '\`');
		}catch(error){
			logger.error('Error while performing listchanneldupe'); 
		}
	},
};
function getchannellist(){
    try {
        var sql = "SELECT DISTINCT name FROM channels";
        sql = mysql.format(sql);
        return new Promise((resolve, reject) => {
          con.query(sql, (err, result) => {
              return err ? reject(err) : resolve(result);
            }
          );
        }
      );
    } catch (error) {
    logger.error(`Error while performing 'SELECT' in the database: ${cascadingChannels_DB_database}, in command listchanneldupe`); 
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
