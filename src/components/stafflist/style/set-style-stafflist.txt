const { MessageFlags } = require("discord.js");
const isPremium = require("../../../functions/isPremium");

module.exports = {
    customId: "set-style-stafflist",
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

            const newStyle = interaction.fields.getTextInputValue("style");
            const splittedStyle = newStyle.split("\n");

            const [rolesStyle, usersStyle] = splittedStyle;

            if (rolesStyle.includes("{role}") && rolesStyle.includes("{count}") && usersStyle.includes("{user}")) {

                // Imposto il nuovo stile
                embed.fields[2].value = newStyle;

                // Carico il nuovo messaggio
                await interaction.message.edit({
                    embeds: [embed]
                });

                await interaction.reply({
                    content: "Stile impostato",
                    flags: MessageFlags.Ephemeral
                }).catch(() => { });
            } else {
                await interaction.reply({
                    content: "Non è stato possibile impostare lo stile",
                    flags: MessageFlags.Ephemeral
                }).catch(() => { });
            }
        } catch (error) {
            console.log(__filename, error);
        }
    }
};