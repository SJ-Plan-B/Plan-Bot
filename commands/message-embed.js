const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('message-embed')
		.setDescription('Send Message.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const exampleEmbed = new EmbedBuilder() // Embedded MSG Creator
			.setColor('#0099ff') // Titel Farbe
			.setTitle('Some title') // Titel der Nachricht
			.setURL('https://discord.js.org/') // Link in der nachricht
			.setAuthor({ name: 'Some name',  // Name der Autors
						iconURL: 'https://i.imgur.com/AfFp7pu.png', //Icon des Autors
						url: 'https://discord.js.org'  // Web link des Autors
							})
			.setDescription('Some description here') // Beschreibung
			.setThumbnail('https://i.imgur.com/AfFp7pu.png') // Großes Bild
			.addFields(
				{ 
					name: 'Regular field title',
					value: 'Some value here' 
					},
				{
					 name: '\u200B', 
					 value: '\u200B' 
					},
				{
					 name: 'Inline field title', 
					 value: 'Some value here', inline: true 
					},
				{
					 name: 'Inline field title', 
					 value: 'Some value here', inline: true 
					},
			)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp(Date.now())
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
		
		interaction.reply({ embeds: [exampleEmbed] });
		}catch(error){
			console.log(error)
			logger.error('Error while performing message-embed.')
		}
	},
};