const { SlashCommandBuilder,  } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { sendMessage } = require('../index.js')
const logger = require('../util/logger').log
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
var mysql = require('mysql');

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
				console.log("counter")
				console.log(counter)
				row.addComponents(
				new MessageButton()
						.setCustomId(roles[index])
						.setLabel(roles[index])
						.setStyle('PRIMARY'),
				)
				if ((index !==0) && ((index+1)%5 ==0) && first === true) {
				const embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Some title')
					.setURL('https://discord.js.org')
					.setDescription('Some description here');
		
				
				let message = { content: 'Pong!', embeds: [embed], components: [row] }
				await interaction.reply(message)
				first = false
				row.spliceComponents(0,5)
				}else if((index !==0) && ((index+1)%5 ==0) && first === false){
				let message = { content: ' ', embeds: [], components: [row] }
				await interaction.send(message)
				}else{
					if (counter === Object.keys(roles).length) {
						console.log("hi")
						let message = { content: ' ', embeds: [], components: [row] }
						sendMessage(channelId, message)
					} else {
					}
				}
			}
		}catch(error){
				logger.error('Error while performing sendrolereaction');
                console.log(error)
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