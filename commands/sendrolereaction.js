const { SlashCommandBuilder,  } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const {client} = require('../index.js')
const logger = require('../util/logger').log
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
	data: new SlashCommandBuilder()
		.setName('sendrolereaction')
		.setDescription('sends the role reaction message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction)
	{
        try{
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
            
            const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');

		await interaction.reply({ content: 'Pong!', embeds: [embed], components: [row] });

		}catch(error){
				logger.error('Error while performing removefromqueue');
                console.log(error)
		}
	},
};