const { SlashCommandBuilder } = require('@discordjs/builders');
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
		.setName('addchanneldupe')
		.setDescription('add channel to cascade')
		.addStringOption(option => option.setName('channelid').setDescription('Enter a Voice Chanel id').setRequired(true)),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const channelid = interaction.options.getString('channelid');
			const channelObject = interaction.guild.channels.cache.get(channelid); // Gets the channel object
			var name = channelObject.name

			if (channelObject.type === 'GUILD_VOICE'){

				try {
					// Insert Voice into Database
					var sql = "INSERT INTO  channels (name, id, isOriginal, copyOf) SELECT * FROM ( SELECT ? AS channelName, ?, true, '') AS dataQuery ON DUPLICATE KEY UPDATE name=channelName";
					var Inserts = [name, channelid,]
					sql = mysql.format(sql, Inserts);
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.http(`Inserted ${name} into database: ${cascadingChannels_DB_database}, table: channels`)
						interaction.reply(`Channel \`${name}\` was added to channel dupe`);
					});

				} catch (error) {
				logger.error(`Error while performing the database: ${cascadingChannels_DB_database}, Conection in addchanneldupe`); 
				}	

			}else{
				interaction.reply('The selectetd channel is no voice channel')
			}

		}catch(error){
			logger.error('Error while performing addchanneldupe'); 
		}
	},
};

