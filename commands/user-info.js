const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('user-info')
		.setDescription('Display info about yourself.'),

	async execute(interaction) // Funktion des Comands
	{
		try {
			return interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
		} catch (error) {
			console.error('Error while performing user-info')
		}
	},
};