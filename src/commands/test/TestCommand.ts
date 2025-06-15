import { ChatInputCommandInteraction, CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { MyCommandInteraction, MyCommandInteractionSettings } from "../../utils/myInteractions/MyCommandInteraction";
import { MyInteractionSettings } from "../../utils/myInteractions/MyInteraction";

export class TestCommand extends MyCommandInteraction {
    constructor() {
        super({
            data: new SlashCommandBuilder(),
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