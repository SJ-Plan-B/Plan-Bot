const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');



<<<<<<< Updated upstream
module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('message-embed')
		.setDescription('sendMessage'),

	async execute(interaction) // Funktion des Comands
	{
		const exampleEmbed = new MessageEmbed() // Embedded MSG Creator
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
=======
module.exports = {
	data: new SlashCommandBuilder()
		.setName('message-embed')
		.setDescription('sendMessage'),
	async execute(interaction) {
		const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
>>>>>>> Stashed changes
		)
		.addField('Inline field title', 'Some value here', true)
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
	
	return interaction.reply({ embeds: [exampleEmbed] });
	},
};