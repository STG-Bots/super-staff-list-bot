import { BaseInteraction, ButtonBuilder, CacheType, ComponentType, Integration, Interaction, PermissionResolvable } from 'discord.js';
import { IMyInteraction, MyInteractionData } from './types';

export abstract class MyInteraction<I extends Interaction> {
    public settings: MyInteractionData<I>;

    constructor(settings: MyInteractionData<I>) {
        this.settings = settings;
    }

    abstract execute(interaction: I): void;
}

export abstract class MyCommandInteraction extends MyInteraction<MyCommandInteractionSettings, ChatInputCommandInteraction> {
    constructor(settings: MyCommandInteractionSettings) {
        super(settings);
    }
}

export abstract class MyButtonInteraction extends MyInteraction<MyComponentInteractionSettings, ButtonInteraction> {
    constructor(settings: MyComponentInteractionSettings) {
        super(settings);
    }
}