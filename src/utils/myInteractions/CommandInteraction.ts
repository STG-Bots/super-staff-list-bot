import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { IMyInteraction, MyInteractionSettings } from './MyInteraction';

type MyCommandInteractionSettings = MyInteractionSettings & {
    data: SlashCommandBuilder
}

interface IMyCommandInteraction extends IMyInteraction {
    settings: MyCommandInteractionSettings;
}

export abstract class MyCommandInteraction implements IMyCommandInteraction {
    public settings: MyCommandInteractionSettings;

    constructor(settings: MyCommandInteractionSettings) {
        this.settings = settings;
    }

    abstract execute(interaction: ChatInputCommandInteraction): void;
}