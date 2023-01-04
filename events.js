const logger = require('./util/logger').log;
const { Standart_Volumen } = require ('./data/comand.json');

module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        logger.error(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        logger.error(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        queue.metadata.send(`Der Bot spielt jetzt **${track.title}** in dem Channel **${queue.connection.channel.name}**!`)
        queue.setVolume(Standart_Volumen)
    });

    player.on("connectionCreate", (queue, track) => {
        queue.setVolume(Standart_Volumen)
    });

    player.on("botDisconnect", (queue) => {
        //queue.metadata.send(" I was manually disconnected from the voice channel, clearing queue!");
    });

    player.on("channelEmpty", (queue) => {
        //queue.metadata.send("Nobody is in the voice channel, leaving...");
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("Die Queue ist zuende");
    });

};
