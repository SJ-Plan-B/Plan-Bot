const {Message, MessageEmbed} = require('discord.js');

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		member.guild.channels.cache.get("979796297169113108").send(`${member.user} has left the server!`);
	}
}