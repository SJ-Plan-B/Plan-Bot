const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log;
const { cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');
var db = require('../util/cascadingChannels_DB')

var pool = db.pool

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('removechanneldupe')
		.setDescription('Removes channel from cascade')
		.addStringOption(option => option.setName('channelid').setDescription('Enter a voice channel ID').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const channelid = interaction.options.getString('channelid');
			const channelObject = interaction.guild.channels.cache.get(channelid); // Gets the channel object
			var name = channelObject.name

			if (channelObject.type === ChannelType.GuildVoice){

				try {
					// Insert Voice into Database
					var sql = "DELETE FROM channels Where name = ?";
					var Inserts = [name]
					sql = mysql.format(sql, Inserts);
					pool.query(sql, function (err, result) {
						if (err) throw err;
						logger.http(`Deleting channel ${name} from database: ${cascadingChannels_DB_database}, table: channels.`)
						if (result.affectedRows > 0) {
							interaction.reply(`Channel \`${name}\` was removed from channeldupe.`);
						} else {
							interaction.reply(`Channel \`${name}\` was not in channeldupe.`);
						}
	
					});

				} catch (error) {
				logger.error(`Error while performing the database: ${cascadingChannels_DB_database}, connection in removechanneldupe.`); 
				}	

			}else{
				interaction.reply('The selected channel is not a voice channel.')
			}

		}catch(error){
			logger.error('Error while performing removechanneldupe'); 
		}
	},
};
