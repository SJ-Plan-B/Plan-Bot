const { SlashCommandBuilder,  } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { sendMessage } = require('../index.js')
var mysql = require('mysql');
const logger = require('../util/logger').log
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
const { rollereact_title, rollereact_collor, rollereact_text } =require('../data/comand.json')


var con = mysql.createConnection({
    host: role_reaction_DB_host, 
    port: role_reaction_DB_port,
    user: role_reaction_DB_user, 
    password: role_reaction_DB_password,
    database: role_reaction_DB_database,
})

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('sendrolereaction')
		.setDescription('sends the role reaction message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction)
	{
        try{
			const channelId = interaction.channelId
			let roles = splitObjIntoArrayOfString(await(getrolelist()))
			var first = true
			var counter = 0
			var row = new MessageActionRow()
			for (let index = 0; index < Object.keys(roles).length; index++) {
				counter++

				row.addComponents(
				new MessageButton()
						.setCustomId("roles_"+roles[index])
						.setLabel(roles[index])
						.setStyle('PRIMARY'),
				)
				if ((index !==0) && ((index+1)%5 ==0) && first === true) {
				const embed = new MessageEmbed()
					.setColor(rollereact_collor)
					.setTitle(rollereact_title)
					.setDescription(rollereact_text);
		
				
				let message = { content: ' ', embeds: [embed], components: [row] }
				await sendMessage(channelId,message)
				first = false
				row.spliceComponents(0,5)
				}else if((index !==0) && ((index+1)%5 ==0) && first === false){
				let message = { content: ' ', embeds: [], components: [row] }
				await sendMessage(channelId,message)
				}else{
					if (counter === Object.keys(roles).length) {

						let message = { content: ' ', embeds: [], components: [row] }
						sendMessage(channelId, message)
					} else {
					}
				}
			}
		}catch(error){
				logger.error('Error while performing sendrolereaction');
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
	try {
		let myJSON = JSON.stringify(obj);
		let myArray = myJSON.split(",")
	  
		for (let index = 0; index < Object.keys(myArray).length; index++) {
			myArray[index] = myArray[index].replace(/{"name":"/, '')
			myArray[index] = myArray[index].replace(/"}/g, '')
		}
	  
		myArray[0] = myArray[0].replace('[', '')
		myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')
		return myArray;
	} catch (error) {
		logger.error('Error while performing splitObjIntoArrayOfString in joinleave')
	}
  }