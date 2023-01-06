const { EmbedBuilder, AuditLogEvent  } = require('discord.js');
const logger = require('../util/logger').log
const { message_welcome ,message_welcome_header, message_welcome_chanel, message_welcome_embed_collor, enable_defalt_roll, default_roll_id } =require('../data/event.json')

module.exports = {
	name: "guildMemberAdd",
	
	async execute(member) {
		var nickname = getname(member)
		welcomen_message(member, nickname)
		standart_role(member, default_roll_id, enable_defalt_roll)
	}
}

function standart_role(member, rollid, enable){
		
		if (enable === true){
			member.roles.set([rollid])
			.then()
			.catch(console.error);
		}

}

function welcomen_message(member, nickname){
	try {
		const newMemberEmbed = new EmbedBuilder()
		.setColor(message_welcome_embed_collor)
		.setTitle(message_welcome_header)
		.setAuthor({
				name: nickname,
				iconURL: member.user.displayAvatarURL()
		})
		.setDescription(message_welcome)
		.setTimestamp();
	
		member.guild.channels.cache.get(message_welcome_chanel).send({
			embeds: [newMemberEmbed] 
		})
	} catch (error) {
		logger.error('Error while performing guildMemberAdd')
	}
}

try {
	function getname(member){
		let memberarry = []
		memberarry = member.user;
			const myJSON = JSON.stringify(memberarry);	
			const myArray = myJSON.split(",")
			const slicerdicer = myArray[4];
			let slicerdicerplus = slicerdicer.slice(11);
			let result = slicerdicerplus.replace(/["]/g, '')
			return result;	
	}	
} catch (error) {
	logger.error('Error while performing getname in guildMemberAdd')
}






