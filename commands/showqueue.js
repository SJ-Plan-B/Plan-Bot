const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('showqueue')
		.setDescription('shows the queue'),

	async execute(interaction)
	{
		try{
			var queue = []
			var result = []
				queue = await(music.getQueue({ interaction: interaction }));
				for (let index = 0; index < Object.keys(queue).length; index++) {
					const myJSON = JSON.stringify(queue[index]);
					const myArray = myJSON.split(",")
					const slicerdicer = myArray[0];
					result[index] = slicerdicer.slice(17);
					console.log(result)
				}
				interaction.reply('\`' + result.join(`\n`) + '\`');
		}catch(error){
			console.warn('Error while performing showqueue')
			console.error(error)
		}
	},
};