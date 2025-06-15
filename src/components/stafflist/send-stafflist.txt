const { Colors, ButtonStyle, MessageFlags, Integration } = require("discord.js");
const loadStaffList = require("../../functions/stafflist/createStaffList");
const roleTagIntoId = require("../../functions/stafflist/roleTagIntoId");
const panels = require("../../schemas/panels");

module.exports = {
    customId: "send-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const embed = interaction.message.embeds[0].data;

            const channel = interaction.guild.channels.cache.get(embed.fields[0].value.slice(2, embed.fields[0].value.length - 1));
            
            // Controlli: Esiste il canale, i ruoli esistono
            if (!channel)
                return await interaction.reply({
                    content: `Il canale selezionato non esiste`,
                    flags: MessageFlags.Ephemeral
                }).catch(() => { });
                
            const rolesIds = embed.fields[1].value.split("\n").map(roleTag => roleTagIntoId(roleTag)).map(rId => interaction.guild.roles.cache.get(rId)).map(r => r?.id).filter(r => r);
            
            // I ruoli sono validi?
            if (rolesIds.length === 0)
                return await interaction.reply({
                    content: `I ruoli non sono validi`,
                    flags: MessageFlags.Ephemeral
                }).catch(() => { });

            await interaction.reply({
                content: `La staff list sarà inviata nel canale ${channel}`,
                flags: MessageFlags.Ephemeral
            }).catch(() => { });

            const tagsButtons = interaction.message.components[2].components;
            // Tags in base al colore dei bottoni
            const rolesTags = tagsButtons[0].data.style === ButtonStyle.Success;
            const usersTags = tagsButtons[1].data.style === ButtonStyle.Success;

            const style = embed.fields[2].value;

            const messageOptions = await loadStaffList(interaction.guild, rolesIds, style, { title: embed.fields[3].value, color: embed.fields[4].value }, { role: rolesTags, user: usersTags });

            const message = await channel.send(messageOptions);

            // Salvo il pannello nel db

            await panels.create({
                id: message.id,
                channelid: channel.id,
                guildid: interaction.guild.id,
                embed: {
                    title: embed.fields[3].value,
                    color: embed.fields[4].value
                },
                tags: {
                    role: rolesTags,
                    user: usersTags
                },
                roles: rolesIds.map(rId => ({ id: rId })),
                style: style
            });
        } catch (error) {
            await interaction.reply({
                content: "Non è stato possibile inviare la staff list",
                flags: MessageFlags.Ephemeral
            }).catch(() => { });
            console.log(__filename, error);
        }
    }
};