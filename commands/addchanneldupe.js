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
		.setName('addchanneldupe')
		.setDescription('Add channel to cascade.')
		.addStringOption(option => option.setName('channelid').setDescription('Enter a voice channel ID.').setRequired(true))
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
					var sql = "INSERT INTO  channels (name, id) SELECT * FROM ( SELECT ? AS channelName, ?) AS dataQuery ON DUPLICATE KEY UPDATE name=channelName";
					var Inserts = [name, channelid,]
					sql = mysql.format(sql, Inserts);
					pool.query(sql, function (err, result) {
						if (err) throw err;
						logger.http(`Inserted ${name} into database: ${cascadingChannels_DB_database}, table: channels.`)
						interaction.reply(`Channel \`${name}\` was added to channel dupe.`);
					});

				} catch (error) {
				logger.error(`Error while performing the database: ${cascadingChannels_DB_database}, connection in addchanneldupe.`); 
				}	

			}else{
				interaction.reply('The selectetd channel is no voice channel.')
			}

		}catch(error){
			logger.error('Error while performing addchanneldupe.'); 
		}
	},
};

