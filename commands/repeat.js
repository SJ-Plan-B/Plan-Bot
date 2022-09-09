const { SlashCommandBuilder } = require('discord.js');
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

			
			const { client } = require('../index');

			const queue = client.player.getQueue(interaction.guild.id);
			if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
			const success = queue.setRepeatMode(loopMode);
			const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
			return void interaction.reply({ content: success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!' });

		}catch(error){
				logger.error('Error while performing reapeat');
				console.log(error)
		}
	},
};