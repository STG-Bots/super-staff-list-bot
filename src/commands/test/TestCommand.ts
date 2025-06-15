import { ChatInputCommandInteraction, CommandInteraction, MessageFlags } from "discord.js";
import { MyCommandInteraction } from "../../utils/myInteractions/CommandInteraction";

export class TestCommand extends MyCommandInteraction {
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        interaction.reply({
            content: "ciao",
            flags: MessageFlags.Ephemeral
        })
    }
}