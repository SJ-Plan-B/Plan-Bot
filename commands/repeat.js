const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log
const { QueueRepeatMode } = require('discord-player');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Repeat a song')
		.addIntegerOption(option =>
			option.setName('mode')
				.setDescription('Set the repeat mode:')
				.setRequired(true)
				.addChoices(
					{ name: 'Off', value: QueueRepeatMode.OFF },
					{ name: 'Track', value: QueueRepeatMode.TRACK },
					{ name: 'Queue', value: QueueRepeatMode.QUEUE },
					{ name: 'Autoplay', value: QueueRepeatMode.AUTOPLAY },
	
				)),
        
	async execute(interaction)
	{
		try{
			const loopMode = interaction.options.getInteger('mode');
			console.log(whatmodeisit(loopMode))
			
			const { client } = require('../index');

			const repeatEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Repeat mode')
			.setDescription(whatmodeisit(loopMode))

			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: 'No music is being playing!' });
			const success = queue.setRepeatMode(loopMode);
			if (success === true) {
				return void interaction.reply({ embeds: [repeatEmbed] });
			} else {
				return void logger.debug('Could not update reapeat mode!')
			}
			

		}catch(error){
				logger.error('Error while performing reapeat.');
				console.log(error)
		}
	},
};

function whatmodeisit(mode){
	switch (mode) {
		case 0: return 'Repeat was turned off!'
				
		case 1: return 'Repeat was put into track mode!'
		
		case 2: return 'Repeat was put into queue mode!'
	
		case 3: return 'Repeat was put into autoplay mode!'

	
		default: logger.debug('Unknown repeat mode!')
			break;
	}

}