const { SlashCommandBuilder } = require('@discordjs/builders');
const {parentPort, workerData} = require("worker_threads");

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	
	async execute(interaction) 
	{
		try {
			return interaction.reply(`${interaction.user.username} said Ping!\nPong!`);
		} catch (error) {
			console.error('Error while performing ping')
		}
	},
};