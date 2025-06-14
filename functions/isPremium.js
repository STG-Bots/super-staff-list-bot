const { supportGuildId } = require("../config.json");

module.exports = async (guild) => {
    if (!guild) return;
    const supportGuild = client.guilds.cache.get(supportGuildId);
    const ownerId = guild.ownerId;
    if (!ownerId) return;
    const guildOwnerInSupportServer = supportGuild.members.cache.get(ownerId);
    return Boolean(guildOwnerInSupportServer);
};