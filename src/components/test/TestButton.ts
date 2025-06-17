import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ModalBuilder, ModalSubmitInteraction } from "discord.js";
import { MyComponentInteraction, MyInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

export class TestButton extends MyComponentInteraction<ButtonInteraction> {
    constructor() {
        super({
            data: new ButtonBuilder()
                .setCustomId("test")
                .setStyle(ButtonStyle.Secondary),
            botPermissions: [],
            memberPermissions: [],
            onlyDevs: false
        });
    }
    async execute(interaction: ButtonInteraction<CacheType>): Promise<void> {
        interaction.reply("Ciao ciao");
    }
}