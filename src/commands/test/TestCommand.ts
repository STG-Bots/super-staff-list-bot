import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { MyCommandInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

class TestCommand extends MyCommandInteraction {
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