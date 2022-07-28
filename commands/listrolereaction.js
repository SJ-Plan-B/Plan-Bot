const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log;
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: role_reaction_DB_host, 
    port: role_reaction_DB_port,
    user: role_reaction_DB_user, 
    password: role_reaction_DB_password,
    database: role_reaction_DB_database,
});

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('listrolereaction')
		.setDescription('list role reaction')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
          interaction.reply('Diese Roles sind in der role reaction \n'+'\`' + splitObjIntoArrayOfString(await(getrolelist())).join(`\n`) + '\`');
		}catch(error){
			logger.error('Error while performing listrole reaction'); 
		}
	},
};
function getrolelist(){
    try {
        var sql = "SELECT DISTINCT name FROM roles";
        sql = mysql.format(sql);
        return new Promise((resolve, reject) => {
          con.query(sql, (err, result) => {
              return err ? reject(err) : resolve(result);
            }
          );
        }
      );
    } catch (error) {
    logger.error(`Error while performing 'SELECT' in the database: ${role_reaction_DB_database}, in command listrolereaction`); 
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
