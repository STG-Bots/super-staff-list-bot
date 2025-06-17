import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ModalBuilder, ModalSubmitInteraction } from "discord.js";
import { MyComponentInteraction, MyInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

export class TestButton extends MyComponentInteraction<ModalSubmitInteraction> {
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
    async execute(interaction: ModalSubmitInteraction<CacheType>): Promise<void> {
        
    }
}