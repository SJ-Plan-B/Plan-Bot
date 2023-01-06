const fs = require('node:fs');
const path = require('node:path');
const {Worker} = require("worker_threads");
const logger = require('./util/logger').log;
const {Client, GatewayIntentBits, Partials, Collection, InteractionType} = require('discord.js');
const {token} = require('./data/config.json');
const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./events');


const client = new Client(
	{intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.MessageContent,
			  ],
	partials: [
				Partials.Message,
				Partials.Channel,
				Partials.Reaction,
				Partials.GuildMember,
				Partials.User,
			]});

	client.player = new Player(client);
	registerPlayerEvents(client.player);

module.exports = {

	client,
	
	async startbot(){


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
			}else{
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
			if (!interaction.type === InteractionType.ApplicationCommand) return;
			const command = client.commands.get(interaction.commandName);
			const channelID = interaction.channel.id;
			const channel = interaction.channel;
			if (!command) return;

			try {
				if (interaction.partial){
					interaction.reply("please try again")
				}else if (interaction.commandName === 'prune') {
					
					let returnvalue = await command.execute(interaction);
					logger.info('prune!'+ returnvalue);
					if (returnvalue===true) {logger.info('channelID '+ channelID); sendMessage(channelID);}

				}else{
					const worker = new Worker('./commands/'+interaction.commandName+'.js', {workerData: await(command.execute(interaction))});

					//worker.postMessage(interaction);

					worker.on('message', result => {logger.debug('worker'+ result)});
			
					worker.on('error', error => {logger.error('worker error'+ error)});
			
					worker.on('exit', exitCode => {
					if(exitCode != 0)
					{logger.verbose(exitCode)}
					;})
				}

			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		});
		
		
		//
		//Login
		//
		
		client.login(token);
	},

	//
	// Globale Send Message Funktion
	//

	async sendMessage(cID,message){
			try {
				const channel = cID;
				client.channels.cache.get(channel).send(message);	
			} catch (error) {
				logger.error('Error while performing sendMessage in Index')
				console.error(error)
			}
	}

}
