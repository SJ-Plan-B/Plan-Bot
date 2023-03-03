const logger = require('./util/logger').log;
const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports.registerPlayerEvents = (player) => {

    player.events.on("error", (queue, error) => {
        logger.error(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    player.events.on("playerError", (queue, error) => {
        logger.error(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });
    player.events.on('connection', (queue) => {
        queue.dispatcher.voiceConnection.on('stateChange', (oldState, newState) => {
            if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
                queue.dispatcher.voiceConnection.configureNetworking();
            }
        });});
};



