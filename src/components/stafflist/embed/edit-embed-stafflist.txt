const { TextInputBuilder } = require("@discordjs/builders");
const { ActionRowBuilder } = require("@discordjs/builders");
const { ModalBuilder, TextInputStyle, MessageFlags } = require("discord.js");
const isPremium = require("../../../functions/isPremium");

module.exports = {
    customId: "edit-embed-stafflist",
    optionsInCustomId: false,
    botPermissions: [],
    memberPermissions: [],
    onlyDevs: false,
    async execute(interaction) {
        try {
            // Controllo se il server è premium
            const premium = isPremium(interaction.guild);
            if (!premium)
                return await interaction.reply({
                    content: "Questo comando può eseguito essere solo in un server premium",
                    flags: MessageFlags.Ephemeral
                }).catch(() => { });

            const embed = interaction.message.embeds[0].data;

            const title = embed.fields[3].value;
            const color = embed.fields[4].value;

            const modal = new ModalBuilder()
                .setCustomId("set-embed-stafflist")
                .setTitle("Modifica l'embed")
                .setComponents([
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("title")
                                .setLabel("Titolo")
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder("Scrivi il titolo")
                                .setValue(title)
                                .setRequired(true)
                                .setMaxLength(100)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("color")
                                .setLabel("Colore")
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder("Scrivi il color")
                                .setValue(color)
                                .setRequired(true)
                                .setMaxLength(50)
                        )
                ])

            await interaction.showModal(modal);
        } catch (error) {
            console.log(__filename, error);
        }
    }
};