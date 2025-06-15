module.exports = {
    customId: "set-channel-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const channelId = interaction.values[0];

            const embed = interaction.message.embeds[0].data;
            // Modifico il canale d'invio
            embed.fields[0].value = `<#${channelId}>`;

            await interaction.message.edit({
                embeds: [embed]
            });
            await interaction.deferUpdate();
        } catch (error) {
            console.log(__filename, error);
        }
    }
};