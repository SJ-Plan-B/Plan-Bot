const {Message, MessageEmbed} = require('discord.js');
const { message_welcome ,message_welcome_header, message_welcome_chanel, message_welcome_embed_collor } =require('../data/config.json')

module.exports = {
	name: "guildMemberAdd",
	
	async execute(member) {
		var nickname = getname(member)
		try {
			const newMemberEmbed = new MessageEmbed()
			.setColor(message_welcome_embed_collor)
			.setTitle(message_welcome_header)
			.setAuthor({
					name: nickname
			})
			.setDescription(message_welcome)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get(message_welcome_chanel).send({
				embeds: [newMemberEmbed] 
			})
		} catch (error) {
			console.warn('Error while performing guildMemberAdd')
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
	console.warn('Error while performing getname in guildMemberAdd')
	console.error(error)
}






