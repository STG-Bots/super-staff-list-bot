import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { MyInteraction, MyInteractionSettings } from './MyInteraction';

export type MyCommandInteractionSettings = MyInteractionSettings & {
    data: SlashCommandBuilder
}

export abstract class MyCommandInteraction extends MyInteraction<MyCommandInteractionSettings> {
    constructor(settings: MyCommandInteractionSettings) {
        super(settings);
    }

    abstract execute(interaction: ChatInputCommandInteraction): void;
}