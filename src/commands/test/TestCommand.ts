import { ActionRowBuilder, ApplicationCommandOptionWithAutocompleteMixin, AutocompleteInteraction, ButtonBuilder, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { MyCommandInteraction } from "../../utils/mybot/myInteractions/MyInteractions";
import TestButton from "../../components/test/TestButton";

class TestCommand extends MyCommandInteraction {
    constructor() {
        super({
            builder: new SlashCommandBuilder()
                .setName("test")
                .setDescription("ciao")
                .addStringOption(option =>
                    option.setName("option1")
                        .setDescription("The first option")
                        .setAutocomplete(true)
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("option2")
                        .setDescription("The second option")
                        .setAutocomplete(true)
                        .setRequired(true)
                ),
            botPermissions: [],
            memberPermissions: [],
            onlyDevs: false
        });
    }
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        interaction.reply({
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(new ButtonBuilder(TestButton.builder.data))
            ],
            content: "ciao",
            flags: MessageFlags.Ephemeral
        })
    }
    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const optionName = interaction.options.data[0].name;
        if (optionName === "option1")
            interaction.respond([{ name: "Nome1", value: "valore1" }]);
        else if (optionName === "option2")
            interaction.respond([{ name: "Nome2", value: "valore2" }]);
    }
}

export default new TestCommand();