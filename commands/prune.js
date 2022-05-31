const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('prune')
		.setDescription('Prune up to 99 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to prune')),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const amount = interaction.options.getInteger('amount');

		if(amount < 1 || amount > 99){
			return interaction.reply({content: 'You need to input a number between 1 and 99.', ephemeral: true});
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => 
			{
			logger.error(error);
			interaction.reply(
				{content: 'There was an error trying to prune messages in this channel!', ephemeral: true});});

		interaction.reply({content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true});
		return false;

		}catch(error){
			logger.warn('Error while performing prune');
			logger.error(error)
		}
	},
};