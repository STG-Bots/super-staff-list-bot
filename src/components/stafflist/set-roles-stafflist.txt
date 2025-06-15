const { MessageFlags } = require("discord.js");

module.exports = {
    customId: "set-roles-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const rolesIds = interaction.values.map(roleId => interaction.guild.roles.cache.get(roleId)).sort((a, b) => b.rawPosition - a.rawPosition).map(r => r.id);

            const embed = interaction.message.embeds[0].data;
            // Modifico il canale d'invio

            const rolesStr = rolesIds.map(rId => `<@&${rId}>`).join("\n");

            // Controllo se si supera il limite del valore del campo
            if (rolesStr.length >= 1024) {
                return interaction.reply({
                    content: "Errore inserimento ruoli",
                    flags: MessageFlags.Ephemeral
                });
            }

            embed.fields[1].value = rolesStr;

            await interaction.message.edit({
                embeds: [embed]
            });
            await interaction.deferUpdate();
        } catch (error) {
            console.log(__filename, error);
        }
    }
};