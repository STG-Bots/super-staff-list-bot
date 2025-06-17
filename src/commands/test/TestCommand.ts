import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { MyCommandInteraction } from "../../utils/mybot/myInteractions/MyInteractions";
import TestButton from "../../components/test/TestButton";

class TestCommand extends MyCommandInteraction {
    constructor() {
        super({
            builder: new SlashCommandBuilder().setName("test").setDescription("ciao"),
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
}

export default new TestCommand();