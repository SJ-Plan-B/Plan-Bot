const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, Message, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const ytdl = require('ytdl-core');
const { get } = require('node:http');
const { channel } = require('node:diagnostics_channel');
const queue = new Map();

const client = new Client(
{intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_VOICE_STATES,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Intents.FLAGS.DIRECT_MESSAGES
		  ]
});

//
// event-handling
//
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));	
	}else if(event.messageCreate){
		console.log(`message is created -> ${message}`);
	}
	else{
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//
// command-handling
//
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	const channelID = interaction.channel.id;
	if (!command) return;

	try {
		if (interaction.commandName === 'prune') {
			let returnvalue = await command.execute(interaction);
			 console.log('prune!'+ returnvalue);
			 if (returnvalue===true) {console.log('channelID '+ channelID); sendMessage(channelID);}
		} else {
			await command.execute(interaction);	
		}
		
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
//
//send message to channel by id
//
async function sendMessage(cID){
	const channel = cID;
	 client.channels.cache.get(channel).send("hello world");	
};
//
//Login
//
client.login(token);