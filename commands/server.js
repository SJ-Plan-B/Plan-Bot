const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('server')
		.setDescription('Display info about this server.'),

	async execute(interaction)  // Funktion des Comands
	{
		try{
			return interaction.reply(`Server name: ${await(interaction.guild.name)}\nTotal members: ${await(interaction.guild.memberCount)}`);
		}catch(error){
			console.warn('Error while performing server')
			console.error(error)
		}
	},
};