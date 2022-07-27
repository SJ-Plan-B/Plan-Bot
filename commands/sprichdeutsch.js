const { SlashCommandBuilder } = require('@discordjs/builders'); 
const { MessageEmbed } = require('discord.js');
const cfs = require('../util/customfunctions.js')
const { deutschcounter } = require('../data/counter.json')
const logger = require('../util/logger').log;

module.exports = 
{
	
	data: new SlashCommandBuilder() // Comand REG
		.setName('sprichdeutsch')
		.setDescription('sag jemandem das er Deutsch Sprechen soll')
        .addUserOption(option => option.setName('target').setDescription('der, der nicht deutsch spricht').setRequired(true)),

	async execute( interaction ) // Funktion des Comands
	{
		let user = interaction.options.getUser('target');
        let Thumbnaillink = 'https://cdn.discordapp.com/attachments/826219699519225886/1001836621685080084/kkudmrvjx9r81.jpg'
        let jsonfile = 'data/counter.json'
        let jsonvariable = 'deutschcounter'

		try{
     
            const Embed = new MessageEmbed()
            .setColor('#e30926')
            .setTitle('Sprich Deutsch du Huren Sohn')
            .setAuthor({
                    name: user.username,
                    iconURL: user.displayAvatarURL()
            })
            .setDescription(`So viele Hurensöhne gibt es bereits:\`${deutschcounter+1}\``)
            .setThumbnail(Thumbnaillink)
            .setTimestamp();

            output = Number((deutschcounter+1))
            let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile,)

            if(counted === true)interaction.reply({embeds: [Embed]});



		}catch(error){
			logger.error('Error while performing sprichdeutsch'); 
            console.log(error)
		} 
	},
};
