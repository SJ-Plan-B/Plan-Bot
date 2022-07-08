const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('showqueue')
		.setDescription('shows the queue'),

	async execute(interaction)
	{
		try {
			try{
				var queue = []
				var result = []
					queue = await(music.getQueue({ interaction: interaction }));
					for (let index = 0; index < Object.keys(queue).length; index++) {
						const myJSON = JSON.stringify(queue[index]);
						const myArray = myJSON.split(",")
						const slicerdicer = myArray[0];
						result[index] = slicerdicer.slice(17);
						logger.debug(result)
					}
					return interaction.reply('\`' + result.join(`\n`) + '\`');
			}catch(error){
				interaction.reply('no song in queue')
			}
		} catch (error) {
			logger.error('Error while performing showqueue')
		}
	}
};