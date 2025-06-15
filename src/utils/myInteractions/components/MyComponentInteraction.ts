import { AnySelectMenuInteraction, ButtonInteraction, ChatInputCommandInteraction, Interaction, ModalSubmitInteraction, SlashCommandBuilder } from 'discord.js';
import { MyInteraction, MyInteractionSettings } from '../MyInteraction';

export type ComponentInteraction = ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction;

export type MyComponentInteractionSettings = MyInteractionSettings & {
    customId: string,
    optionsInCustomId: boolean,
}

export abstract class MyComponentInteraction extends MyInteraction<MyComponentInteractionSettings> {
    constructor(settings: MyComponentInteractionSettings) {
        super(settings);
    }

    abstract execute(interaction: ComponentInteraction): void;
}