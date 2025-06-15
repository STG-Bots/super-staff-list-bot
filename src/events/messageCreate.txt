const { Events } = require("discord.js");
const isPremium = require("../functions/isPremium");

const { supportGuildId, devs } = require("../config.json");

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        try {
            const prefix = "%";
            if (!message.content.startsWith(prefix) || message.author.bot) return;

            const splittedMessage = message.content.split(/ +/);
            const cmd = splittedMessage[0].slice(prefix.length, splittedMessage[0].length);
            const args = splittedMessage.slice(1, splittedMessage.length);

            if (cmd === "owners") {
                if (!devs.includes(message.author.id)) return;
                const supportGuild = client.guilds.cache.get(supportGuildId);
                const serversOwnersIds = new Set(client.guilds.cache.map(g => g.ownerId));
                const ownersInSupportServer = supportGuild.members.cache.map(m => m.user).filter(u => serversOwnersIds.has(u.id));
                message.channel.send(ownersInSupportServer.map(u => `${u.username} (${u.id})`).join("\n"));
            } else if (cmd === "premiumcmd") {
                if (!(await isPremium(message.guild))) {
                    return message.channel.send("Non puoi eseguire questo comando");
                }
            }
        } catch (error) {
            console.log(__filename, error);
        }
    }
};