const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('server')
		.setDescription('Display info about this server.'),

	async execute(interaction)  // Funktion des Comands
	{
		try {
			return interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		} catch (error) {
			console.error('Error while performing server')
		}
	},
};