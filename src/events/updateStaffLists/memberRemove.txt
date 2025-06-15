const { Events } = require("discord.js");
const { CronJob } = require("cron");
const panels = require("../../schemas/panels");
const createStaffList = require("../../functions/stafflist/createStaffList");

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        try {
            // Check if members'roles are included in a staff list
            
            // Code ...
            return;
            const oldMemberRolesIds = oldMember.roles.cache.map(r => r.id);
            const newMemberRolesIds = newMember.roles.cache.map(r => r.id);

            if (oldMemberRolesIds != newMemberRolesIds) {
                const guild = newMember.guild;
                const addedRoles = newMemberRolesIds.filter(id => !oldMemberRolesIds.includes(id));
                const removedRoles = oldMemberRolesIds.filter(id => !newMemberRolesIds.includes(id));
                const difference = addedRoles.concat(removedRoles);

                if (difference.length === 0) return;

                const guildPanels = await panels.find({ guildid: guild.id });

                const selectedPanels = guildPanels.filter(panel => panel.roles.some(r => difference.includes(r.id)));

                selectedPanels.forEach(async guildPanel => {
                    if (!guildPanel) return;

                    const guild = client.guilds.cache.get(guildPanel.guildid);

                    if (!guild) return;

                    const channel = guild.channels.cache.get(guildPanel.channelid);
                    let message = null;

                    try {
                        message = await channel?.messages?.fetch(guildPanel.id);
                    } catch (error) {
                        await panels.findOneAndDelete({ id: guildPanel.id })
                        console.log(__filename, error);
                        return;
                    }

                    const messageOptions = await createStaffList(guild, guildPanel.roles.map(r => r.id), guildPanel.style, guildPanel.embed, guildPanel.tags);
                    console.log("AGGIORNAMENTO STAFF LIST");
                    message?.edit(messageOptions);
                });
            }
        } catch (error) {
            console.log(__filename, error);
        }
    }
};