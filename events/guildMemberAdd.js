const {Message, MessageEmbed} = require('discord.js');

module.exports = {
	name: "guildMemberAdd",
	async execute(member) {
		member.guild.channels.cache.get("979796261127483433").send(`${member.user} Willkommen in der Apotheke Plan B. Hier erhalten Sie ausschließlich die "Pille Danach", die auch gegen Menschen funktionieren, die schon lange geboren sind.`);
		console.log(member.user);

		const newMemberEmbed = new MessageEmbed()
			.setColor("#d81e5b")
			.setTitle("New Member!")
			.setDescription(`${member.user} Willkommen in der Apotheke Plan B. Hier erhalten Sie ausschließlich die "Pille Danach", die auch gegen Menschen funktionieren, die schon lange geboren sind.`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();
		
			member.guild.channels.cache.get("979796261127483433").send({
				embeds: [newMemberEmbed] 
			})
	}
}