const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('change volume')
        .setDMPermission(false)
        .addIntegerOption(option => option.setName('volume').setDescription('enter volume').setRequired(true)),

	async execute(interaction)
	{
        try{
            const volume = interaction.options.getInteger('volume');
            if(volume > 0){
            music.volume({
                interaction: interaction,
                volume: volume
            })
            interaction.reply('volume set to '+volume);
            }else{
                interaction.reply('incorrect volume')
                };
        }catch(error){
            logger.warn('Error while performing volume')
            logger.error(error)
        }
        
	},
};