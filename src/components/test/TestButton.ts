import { ButtonInteraction, ButtonStyle, GuildTextBasedChannel } from "discord.js";
import { MyButtonInteraction } from "../../utils/myInteractions/components/MyButtonInteraction";

export class TestButton extends MyButtonInteraction {
    constructor() {
        super({
            customId: "test-btn",
            optionsInCustomId: false,
            botPermissions: [],
            memberPermissions: [],
            onlyDevs: false
        });
    }
    async execute(interaction: ButtonInteraction): Promise<void> {
        interaction.reply({
            content: "ciao",
            flags: MessageFlags.Ephemeral
        })
    }
}