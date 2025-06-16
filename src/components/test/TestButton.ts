import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType } from "discord.js";
import { MyInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

export class TestButton extends MyInteraction<ButtonInteraction> {
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
    execute(interaction: ButtonInteraction<CacheType>): void {
    }
}