//#region (startup and imports)
require('dotenv').config()
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./json/config.json");
client.login(process.env.DISCORD_TOKEN)
client.on('ready', () => {
    console.log(`\x1B[31m███████╗██╗░░██╗██████╗░██████╗░░█████╗░████████╗\n\x1B[33m██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝\n\x1B[32m█████╗░░███████║██║░░██║██████╦╝██║░░██║░░░██║░░░\n\x1B[36m██╔══╝░░██╔══██║██║░░██║██╔══██╗██║░░██║░░░██║░░░\n\x1B[34m██║░░░░░██║░░██║██████╔╝██████╦╝╚█████╔╝░░░██║░░░\n\x1B[35m╚═╝░░░░░╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░\n\x1B[0m${client.user.tag} has started up!\n`)    
    client.user.setActivity(`people suffer`, { type: 'WATCHING', url: "https://www.twitch.tv/fhdhgngn" })
})
//#endregion
//#region (command handler [VERY BAD])
const country = require("./commands/country.js")
const commandHandler = new Map();
country.registerCommands(commandHandler);
//#endregion
//#region (bot invited)
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I'm GuessBot. Thanks for inviting me! You can find my commands by typing \`${config.prefix}help.\``)
    .catch(console.error);
});
//#endregion
client.on('messageCreate', (message) => { //normal commands
    if(message.author.id === client.user.id) return;
    if (message.content.indexOf(config.prefix) !== 0) {
        if (country.isGuessingCountry()) {
            country.handleGuessing(message)
        }
    }
    
    const handler = commandHandler.get(message.content.split(" ")[0])
    if (handler !== undefined){
        handler(message);
    }
})