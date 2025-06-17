import { ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, Interaction, ModalSubmitInteraction, PermissionResolvable } from 'discord.js';
import { BuilderData, MyComponentInteractionData, MyComponentInteractions, MyInteractionData } from './types';

export interface IMyInteraction<I extends Interaction> extends MyInteractionData<I> {
    execute(interaction: I): Promise<void>;
}

export abstract class MyInteraction<I extends Interaction> implements IMyInteraction<I> {
    public builder: BuilderData<I>;
    public botPermissions: PermissionResolvable[];
    public memberPermissions: PermissionResolvable[];
    public onlyDevs: boolean;

    constructor(settings: MyInteractionData<I>) {
        const { builder, botPermissions, memberPermissions, onlyDevs } = settings;
        this.builder = builder;
        this.botPermissions = botPermissions;
        this.memberPermissions = memberPermissions;
        this.onlyDevs = onlyDevs;
    }

    abstract execute(interaction: I): Promise<void>;
}

export abstract class MyCommandInteraction extends MyInteraction<ChatInputCommandInteraction> {
    constructor(settings: MyInteractionData<ChatInputCommandInteraction>) {
        super(settings);
    }
}

export interface IMyComponentInteraction<I extends MyComponentInteractions> extends MyComponentInteractionData<I> {}

export abstract class MyComponentInteraction<I extends MyComponentInteractions> extends MyInteraction<I> implements IMyComponentInteraction<I> {
    public optionsInCustomId: boolean;
    constructor(settings: MyComponentInteractionData<I>) {
        super(settings);
        const { optionsInCustomId } = settings;
        this.optionsInCustomId = optionsInCustomId;
    }
}