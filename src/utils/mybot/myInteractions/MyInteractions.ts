import { ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, Interaction, ModalSubmitInteraction } from 'discord.js';
import { MyComponentInteractions, MyInteractionData } from './types';

export interface IMyInteraction<I extends Interaction> {
    settings: MyInteractionData<I>;
    execute(interaction: I): Promise<void>;
}

export abstract class MyInteraction<I extends Interaction> implements IMyInteraction<I> {
    public settings: MyInteractionData<I>;

    constructor(settings: MyInteractionData<I>) {
        this.settings = settings;
    }

    abstract execute(interaction: I): Promise<void>;
}

export abstract class MyCommandInteraction extends MyInteraction<ChatInputCommandInteraction> {

    constructor(settings: MyInteractionData<ChatInputCommandInteraction>) {
        super(settings);
    }
}

export abstract class MyComponentInteraction<I extends MyComponentInteractions> extends MyInteraction<I> {

    constructor(settings: MyInteractionData<I>) {
        super(settings);
    }
}