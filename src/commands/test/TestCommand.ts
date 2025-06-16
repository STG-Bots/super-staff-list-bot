import { ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, CommandInteraction, MessageFlags, ModalBuilder, SlashCommandBuilder } from "discord.js";
import { MyCommandInteraction, MyCommandInteractionSettings } from "../../utils/myInteractions/MyCommandInteraction";
import { MyInteractionSettings } from "../../utils/myInteractions/MyInteractions";
import { MyInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

class TestCommand extends MyInteraction<ButtonInteraction> {
    constructor() {
        super({
            data: new SlashCommandBuilder().setName("test").setDescription("ciao"),
            botPermissions: [],
            memberPermissions: [],
            onlyDevs: false
        });
    }
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        interaction.reply({
            content: "ciao",
            flags: MessageFlags.Ephemeral
        })
    }
}

export default new TestCommand();