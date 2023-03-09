const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Standart_Volumen } = require ('../data/comand.json');
const logger = require('../util/logger').log;
const { command_burger_song_link, command_burger_picture_link } =require('../data/comand.json')
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('burger')
		.setDescription('Hamburger, Cheeseburger, Big Mac, Whopper.'),

	async execute(interaction)
	{
		try {
			let datei = path.join(__dirname, '..', 'data', 'counter.json')
			let { burgercounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			let channel = interaction.member.voice.channel;
			let song = command_burger_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'burgercounter'
			let newcountervalue = burgercounter+1
		

			const BurgerEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Burger')
			.setDescription(`${await(interaction.user.username)} Träumt von Burgern.
							So oft wurde schon von Burgern geträumt: \`${newcountervalue}\``)
			.setThumbnail(command_burger_picture_link)

			const voiceEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Error')
			.setDescription(`${await(interaction.user.username)} You are required to be in a voice channel.`)
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

			const { client } = require('../index');

			if (!channel) return interaction.reply({ embeds: [voiceEmbed] }); 

			await interaction.deferReply();	
			
			try {
				await client.player.play(channel, song, {
										nodeOptions: {
										metadata: {
										channel: interaction.channel,
										client: interaction.guild.members.me,
										requestedBy: interaction.user,
										},
										selfDeaf: true,
										volume: Standart_Volumen,
										leaveOnEmpty: true,
										leaveOnEmptyCooldown: 300000,
										leaveOnEnd: true,
										leaveOnEndCooldown: 300000,
										},
										});
				} catch (error) {
					return interaction.editReply(`Something went wrong: ${error}`);
				}
	
			let output = Number((newcountervalue))
			let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder)

			if(counted === true)interaction.editReply({ embeds: [BurgerEmbed] });
				
			} catch (error) {
			logger.error('Error while performing burger.')
		}
	},
};