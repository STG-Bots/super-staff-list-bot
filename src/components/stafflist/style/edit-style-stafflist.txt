const { TextInputBuilder } = require("@discordjs/builders");
const { ActionRowBuilder } = require("@discordjs/builders");
const { ModalBuilder, TextInputStyle, MessageFlags } = require("discord.js");
const isPremium = require("../../../functions/isPremium");

module.exports = {
    customId: "edit-style-stafflist",
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

            const style = embed.fields[2].value;

            const modal = new ModalBuilder()
                .setCustomId("set-style-stafflist")
                .setTitle("Modifica lo stile")
                .setComponents([
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("style")
                                .setLabel("Stile")
                                .setStyle(TextInputStyle.Paragraph)
                                .setPlaceholder("Scrivi lo stile")
                                .setValue(style)
                                .setRequired(true)
                                .setMaxLength(100)
                        )
                ])

            await interaction.showModal(modal);
        } catch (error) {
            console.log(__filename, error);
        }
    }
};