const { SlashCommandBuilder, PermissionsBitField, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Colors, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder } = require("discord.js");
const isPremium = require("../../functions/isPremium");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stafflist")
        .setDescription("Crea una nuova staff list"),
    botPermissions: [PermissionsBitField.Flags.SendMessages],
    memberPermissions: [PermissionsBitField.Flags.Administrator],
    onlyDevs: false,
    async execute(interaction) {
        try {
            const premium = isPremium(interaction.guild);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Crea la staff list`)
                        .setDescription("Modifica le impostazioni della staff list")
                        .setColor(Colors.Orange)
                        .setFields([
                            {
                                name: "Canale d'invio",
                                value: "Nessun canale selezionato"
                            },
                            {
                                name: "Ruoli",
                                value: "Nessun ruolo selezionato"
                            },
                            {
                                name: "Stile",
                                value: "{role}: {count}\n-> {user}"
                            },
                            {
                                name: "Titolo",
                                value: "Staff List"
                            },
                            {
                                name: "Colore",
                                value: "Default"
                            }
                        ])
                ],
                components: [
                    new ActionRowBuilder()
                        .setComponents(
                            new ChannelSelectMenuBuilder()
                                .setCustomId("set-channel-stafflist")
                                .setPlaceholder("Seleziona un canale d'invio")
                                .setChannelTypes(ChannelType.GuildText)
                        ),
                    new ActionRowBuilder()
                        .setComponents(
                            new RoleSelectMenuBuilder()
                                .setCustomId("set-roles-stafflist")
                                .setPlaceholder("Seleziona dei ruoli")
                                .setMinValues(1)
                                .setMaxValues(20)
                        ),
                    new ActionRowBuilder()
                        .setComponents(
                            new ButtonBuilder()
                                .setCustomId("toggle-rolestags-stafflist")
                                .setLabel("Tag ruoli")
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId("toggle-userstags-stafflist")
                                .setLabel("Tag utenti")
                                .setStyle(ButtonStyle.Success)
                        ),
                    new ActionRowBuilder()
                        .setComponents(
                            new ButtonBuilder()
                                .setCustomId("edit-style-stafflist")
                                .setLabel("Modifica stile")
                                .setStyle(ButtonStyle.Secondary)
                                .setDisabled(!premium),
                            new ButtonBuilder()
                                .setCustomId("edit-embed-stafflist")
                                .setLabel("Modifica embed")
                                .setStyle(ButtonStyle.Secondary)
                                .setDisabled(!premium),
                            new ButtonBuilder()
                                .setCustomId("send-stafflist")
                                .setLabel("Invia staff list")
                                .setStyle(ButtonStyle.Primary)
                        )
                ]
            });
        } catch (error) {
            console.log(__filename, error);
        }

    },
    async autocomplete(interaction) {
        // console.log(interaction);
        const fieldName = interaction.options._hoistedOptions[0].name;
        if (fieldName === "nomeform") {
            const allForms = await forms.find({ guildId: interaction.guild.id });
            interaction.respond(allForms.map(form =>
            ({
                name: form.name,
                value: form.formId
            })
            ));
        } else if (fieldName === "oggetto2") {
            interaction.respond([
                {
                    name: "Ciao2",
                    value: "ciaoaoa"
                }
            ]);
        }
    }
}