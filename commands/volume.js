const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('change volume')
        .addIntegerOption(option => option.setName('volume').setDescription('enter volume in %').setRequired(true)),

	async execute(interaction)
	{
        try{
            const { client } = require('../index');
            const vol  = interaction.options.getInteger('volume');
        
            const queue = client.player.getQueue(interaction.guild.id);
            if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });

            if (!vol) return void interaction.reply({ content: `🎧 | Current volume is **${queue.volume}**%!` });

            if (vol < 0 || vol > 100) return void interaction.reply({ content: '❌ | Volume range must be 0-100' });
            
            const success = queue.setVolume(vol);
            return void interaction.reply({
                content: success ? `✅ | Volume set to **${vol}%**!` : '❌ | Something went wrong!'
            });
            
        }catch(error){
            logger.error('Error while performing volume')
        }
        
	},
};