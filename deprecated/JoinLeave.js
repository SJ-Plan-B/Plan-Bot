const logger = require('../util/logger').log
const client = require('../index')
const { Collection } = require('discord.js');
const voiceCollection = new Collection()


module.exports = {
	name: "voiceStateUpdate",
async	execute(oldstate, newstate,) {
        try {
        

        var newUserChannel = newstate.channelId //new channel
        var oldUserChannel = oldstate.channelId //old channel

        if(oldUserChannel === null && newUserChannel !== null) {

            // User Joins a voice channel
     


        } else if(oldUserChannel !== null && newUserChannel === null){

            // User leaves a voice channel


        } else if(oldUserChannel !== null && newUserChannel !== null){

            // User leaves a voice channel

        }else{
            logger.warn('Cannot identify join/leave Event')
        }

		} catch (error) {
			logger.warn('Error while performing interactionCreate')
			console.log(error)
		}
	},
};

  
/*
if(command === 'setup'){
    var botname= 'DJ Musica' // setup messaggio con reazioni
    message.guild.channels.create(botname,{ //Create a channel
      
      type: 'text', //Make sure the channel is a text channel
      permissionOverwrites: [{ //Set permission overwrites
          id: message.guild.id,
          allow: ['VIEW_CHANNEL'],              
      }]
      
  }).then(channel => channel.send('eccoci ' + message.channel.id))}


const channelName = 'test-voice-anders'

const getVoiceChannels = (guild) => {
  return guild.channels.cache.filter((channel) => {
    return channel.type === 'voice' && channel.name === channelName
  })
}

module.exports = {
    name: 'voiceStateUpdate',
	execute(oldMember, newMember) {
  
    const { guild } = oldMember
    const joined = !!newMember.channelID

    const channelId = joined ? newMember.channelID : oldMember.channelID
    let channel = newMember;
  console.log(channel);

    if (channel.name === channelName) {
      if (joined) {
        const channels = getVoiceChannels(guild)

        let hasEmpty = false

        channels.forEach((channel) => {
          if (!hasEmpty && channel.members.size === 0) {
            hasEmpty = true
          }
        })

        if (!hasEmpty) {
          const {
            type,
            userLimit,
            bitrate,
            parentID,
            permissionOverwrites,
            rawPosition,
          } = channel

          guild.channels.create(channelName, {
            type,
            bitrate,
            userLimit,
            parent: parentID,
            permissionOverwrites,
            position: rawPosition,
          })
        }
      } else if (
        channel.members.size === 0 &&
        getVoiceChannels(guild).size > 1
      ) {
        channel.delete()
      }
    } else if (oldMember.channelID) {
      channel = guild.channels.cache.get(oldMember.channelID)
      if (
        channel.name === channelName &&
        channel.members.size === 0 &&
        getVoiceChannels(guild).size > 1
      ) {
        channel.delete()
      }
    }
  },
};
*/