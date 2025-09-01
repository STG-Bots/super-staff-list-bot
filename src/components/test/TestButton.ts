import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ModalBuilder, ModalSubmitInteraction } from "discord.js";
import { MyComponentInteraction, MyInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

class TestButton extends MyComponentInteraction<ButtonInteraction> {
    constructor() {
        super({
            builder: new ButtonBuilder()
                .setCustomId("test_btn")
                .setLabel("Test")
                .setStyle(ButtonStyle.Secondary),
            botPermissions: [],
            memberPermissions: [],
            onlyDevs: false,
            optionsInCustomId: false
        });
    }
    async execute(interaction: ButtonInteraction<CacheType>): Promise<void> {
        throw new Error("Test errror");
        interaction.reply("Ciao ciao");
    }
}

export default new TestButton();