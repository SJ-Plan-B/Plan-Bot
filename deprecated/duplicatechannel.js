const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log;


module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('duplicatechannel')
		.setDescription('duplicate a Channel'),

	async execute(interaction) // Funktion des Comands
	{
		try{
                        await interaction.deferReply()
                        let cate = "863102864342908939" //interaction.guild.channels.cache.find((c) => c.name === "TALK"&&c.type ==="GUILD_CATEGORY") //let cate = interaction.guild.channels.cache.find((c) => c.name === "test-voice-anders"&&c.type ==="talk") 
                        if (!cate) return interaction.editReply('category not found')
                        // remember don't put await here
                        let channel = interaction.guild.channels.create("test-voice-anders", {
                        type: "GUILD_VOICE",
                        parent: cate,
                        permissionOverwrites: [
                            {
                            id: interaction.guild.id,
                            //deny: ["VIEW_CHANNEL"],
                            },
                        ],
                        })//.then(channell=> channell.setParent(cate))
		}catch(error){
			logger.error('Error while performing D20');
		}
	},
};

