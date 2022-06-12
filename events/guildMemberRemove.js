const {Message, MessageEmbed} = require('discord.js');
const logger = require('../util/logger').log
const { message_leave_1, message_leave_2, message_leave_header, message_leave_chanel, message_leave_embed_collor } =require('../data/config.json')

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		var nickname = getname(member)

		try {
			const newMemberEmbed = new MessageEmbed()
			.setColor(message_leave_embed_collor)
			.setTitle(message_leave_header)
			.setAuthor({
					name: nickname
			})
			.setDescription(message_leave_1+nickname+' '+message_leave_2)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get(message_leave_chanel).send({
				embeds: [newMemberEmbed] 
			})
		} catch (error) {
			logger.warn('Error while performing guildMemberRemove')
			logger.error(error)
		}	

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
	logger.warn('Error while performing getname in guildMemberRemove')
	logger.error(error)
}