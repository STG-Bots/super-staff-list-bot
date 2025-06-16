import { Interaction } from 'discord.js';
import { MyInteractionData } from './types';

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