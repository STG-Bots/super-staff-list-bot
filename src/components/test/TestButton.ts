import { ButtonInteraction, ButtonStyle, GuildTextBasedChannel, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { MyButtonInteraction } from "../../utils/myInteractions/components/MyButtonInteraction";
import { MyInteraction } from "../../utils/mybot/myInteractions/MyInteractions";

export class TestButton extends MyInteraction<StringSelectMenuInteraction> {
    constructor() {
        super({
            data: 
        });
    }
    async execute(interaction: StringSelectMenuInteraction): Promise<void> {
    }
}