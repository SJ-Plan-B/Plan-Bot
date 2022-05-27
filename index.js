const fs = require('node:fs');
const path = require('node:path');
const {Worker} = require("worker_threads");
const {Client, Collection, Intents, Message, Channel, MessageEmbed} = require('discord.js');
const {token} = require('./data/config.json');



const client = new Client(
{intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_VOICE_STATES,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Intents.FLAGS.DIRECT_MESSAGES
		  ]
});

const queue = new Map();

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
	const channel = interaction.channel;
	if (!command) return;

	try {
		if (interaction.commandName === 'prune') {
			let returnvalue = await command.execute(interaction);
			 console.log('prune!'+ returnvalue);
			 if (returnvalue===true) {console.log('channelID '+ channelID); sendMessage(channelID);}
		}else {
			const worker = new Worker('./commands/'+interaction.commandName+'.js', {workerData: await(command.execute(interaction))});

			//worker.postMessage(interaction);

			worker.on('message', result => {console.log('worker'+ result)});
	
			worker.on('error', error => {console.log('worker error'+ error)});
	
			worker.on('exit', exitCode => {
			if(exitCode != 0)
			{console.log(exitCode)}
			;})
		}
		
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
//
//send message to channel by id
//
async function sendMessage(cID,message){
	const channel = cID;
	 client.channels.cache.get(channel).send(message);	
};
//
//Login
//
client.login(token);