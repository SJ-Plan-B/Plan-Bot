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
		.setName('listchanneldupewithid')
		.setDescription('List of channels to be duplicated by id.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
          await interaction.deferReply()
          //console.log(await(getchannellist()))
          await interaction.editReply('Channels to be duplicated: \n'+'\`' + splitObjIntoArrayOfString(await(getchannellist())).join("") + '\`');
          
		}catch(error){
			logger.error('Error while performing listchanneldupe.'); 
		}
  
  },
};
function getchannellist(){
    try {
        var sql = "SELECT name, id FROM channels order by name";
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
        myArray[index] = myArray[index].replace(/"/g, '')
        myArray[index] = myArray[index].replace(/id:/, ' : ')
        myArray[index] = myArray[index].replace(/}/g, '')
        if(index%2==1){myArray[index] = myArray[index].concat(`\n`)}
    }
  
    myArray[0] = myArray[0].replace('[', '')
    myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')
    return myArray;
  }