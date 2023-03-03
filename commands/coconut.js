const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Standart_Volumen } = require ('../data/comand.json');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_coconut_song_link, command_coconut_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('coconut')
		.setDescription('Coconut is a giant nut!'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { coconutcounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			const channel = interaction.member.voice.channel;
			const song = command_coconut_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'coconutcounter'
			let newcountervalue = coconutcounter+1

			const CoconutEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Coconut')
			.setDescription(`${await(interaction.user.username)} ist von 'ner Kokosnuss erschlagen worden.
							\`${newcountervalue}\` Personen wurden schon von Kokosnüssen erschlagen.`)
			.setThumbnail(command_coconut_picture_link)

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

			if(counted === true)interaction.editReply({ embeds: [CoconutEmbed] });

		} catch (error) {
			logger.error('Error while performing coconut.')
		}
	},
};