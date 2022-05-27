const {Message, MessageEmbed} = require('discord.js');
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
			.setDescription(message_leave_1+nickname+message_leave_2)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get(message_leave_chanel).send({
				embeds: [newMemberEmbed] 
			})
		} catch (error) {
			console.warn('Error while performing guildMemberRemove')
			console.error(error)
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
			let membername = slicerdicer.slice(11);
			let result = membername.replace(/["]/g, '')
			return result;	
	}	
} catch (error) {
	console.warn('Error while performing getname in guildMemberRemove')
	console.error(error)
}