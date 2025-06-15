const { MessageFlags, Colors } = require("discord.js");
const isPremium = require("../../../functions/isPremium");

module.exports = {
    customId: "set-embed-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const premium = isPremium(interaction.guild);
            if (!premium)
                return await interaction.reply({
                    content: "Questo comando può eseguito essere solo in un server premium",
                    flags: MessageFlags.Ephemeral
                }).catch(() => { });

            const embed = interaction.message.embeds[0].data;

            const newTitle = interaction.fields.getTextInputValue("title");

            // Imposto il nuovo titolo
            embed.fields[3].value = newTitle;

            const newColor = interaction.fields.getTextInputValue("color");

            // Imposto il nuovo colore
            embed.fields[4].value = Object.keys(Colors).includes(newColor) ? newColor : embed.fields[4].value;

            // Carico il nuovo messaggio
            await interaction.message.edit({
                embeds: [embed]
            });

            await interaction.reply({
                content: "Embed impostato",
                flags: MessageFlags.Ephemeral
            }).catch(() => { });
        } catch (error) {
            console.log(__filename, error);
        }
    }
};