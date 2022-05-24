const fs = require('node:fs');
const path = require('node:path');
const music = require('@koenie06/discord.js-music')
const ytdl = require('ytdl-core');
const { Client, Collection, Intents, Message, Channel, MessageEmbed } = require('discord.js');
const { VoiceConnection, joinVoiceChannel, } = require('@discordjs/voice');
const { token, guildId } = require('./config.json');
const { get } = require('node:http');
const { channel } = require('node:diagnostics_channel');



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
	const serverQueue = queue.get(interaction.guild.id);
	const command = client.commands.get(interaction.commandName);
	const channelID = interaction.channel.id;
	const channel = interaction.channel;
	if (!command) return;

	try {
		if (interaction.commandName === 'prune') {
			let returnvalue = await command.execute(interaction);
			 console.log('prune!'+ returnvalue);
			 if (returnvalue===true) {console.log('channelID '+ channelID); sendMessage(channelID);}
		}else if (interaction.commandName === 'play'){
			let {url, voiceChannel}  = await command.execute(interaction);
			console.log('play '+ url +' voiceChannel '+voiceChannel);
			musicPlayer(url, serverQueue, channel, voiceChannel);
		}else {
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
//music
//
async function musicPlayer(urlinput, serverQueue, messagechannel, voiceChannel) {
  
	const songInfo = await ytdl.getInfo(urlinput);
	const song = {
		  title: songInfo.videoDetails.title,
		  url: songInfo.videoDetails.video_url,
	 };
  
	//if (serverQueue) {
	  const queueContruct = {
		textChannel: messagechannel,
		voiceChannel: voiceChannel,
		connection: null,
		songs: [],
		volume: 5,
		playing: true
	  };
  
	  queue.set(serverQueue, queueContruct);
  
	  try {
		queueContruct.songs.push(song);	
	} catch (error) {
		console.log('Error while song push into serverQueue 1')
	}
	  try {
		 const connection = joinVoiceChannel({channelId: voiceChannel, guildId: serverQueue, adapterCreator: voiceChannel.guild.voiceAdapterCreator})
		 serverQueue.connection = connection;
		play(serverQueue, queueContruct.songs[0]);
	  } catch (err) {
		console.log(err);
		queue.delete(serverQueue);
		//return message.channel.send(err);
	  }
	/*} else {
		try {
			queueContruct.songs.push(song);	
		} catch (error) {
			console.log('Error while song push into serverQueue 2')
		}
	  
	  //return message.channel.send(`${song.title} has been added to the queue!`);
	}*/
  }
  
  function skip(message, serverQueue) {
	if (!message.member.voice.channel)
	  return message.channel.send(
		"You have to be in a voice channel to stop the music!"
	  );
	if (!serverQueue)
	  return message.channel.send("There is no song that I could skip!");
	serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
	if (!message.member.voice.channel)
	  return message.channel.send(
		"You have to be in a voice channel to stop the music!"
	  );
	  
	if (!serverQueue)
	  return message.channel.send("There is no song that I could stop!");
	  
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
  }
  
  function play(serverQueue, song) {
	if (!song) {
	  serverQueue.voiceChannel.leave();
	  queue.delete(guild.id);
	  return;
	}
		const dispatcher = serverQueue.connection
			.play(ytdl(song.url))
			.on("finish", () => {
			  serverQueue.songs.shift();
			  play(guild, serverQueue.songs[0]);
			})
			.on("error", error => console.error(error));
		  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		  serverQueue.textChannel.send(`Start playing: **${song.title}**`);

  }  
//
//Login
//
client.login(token);