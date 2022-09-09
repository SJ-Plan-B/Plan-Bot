const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../util/logger').log
const { QueueRepeatMode } = require('discord-player');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('repeat song')
		.addIntegerOption(option =>
			option.setName('mode')
				.setDescription('set the Reapeat Mode')
				.setRequired(true)
				.addChoices(
					{ name: 'off', value: QueueRepeatMode.OFF },
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
			.setTitle('Repeat Mode')
			.setDescription(whatmodeisit(loopMode))

			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: 'No music is being playing' });
			const success = queue.setRepeatMode(loopMode);
			if (success === true) {
				return void interaction.reply({ embeds: [repeatEmbed] });
			} else {
				return void logger.debug('Could not update reapeat mode!')
			}
			

		}catch(error){
				logger.error('Error while performing reapeat');
				console.log(error)
		}
	},
};

function whatmodeisit(mode){
	switch (mode) {
		case 0: return 'the repeat was turnd off'
			
			
		case 1: return 'repeat was put into Track mode'
		
		case 2: return 'repeat was put into Queue mode'
	
		case 3: return 'repeat was put into Autoplay mode'

	
		default: logger.debug('Unknown Repead Mode')
			break;
	}

}