import { Interaction, PermissionFlags } from 'discord.js';

export type MyInteractionSettings = {
    botPermissions: PermissionFlags[],
    memberPermissions: PermissionFlags[],
    onlyDevs: boolean,
}

export abstract class MyInteraction<T> {
    public settings: T;

    constructor(settings: T) {
        this.settings = settings;
    }

    abstract execute(interaction: Interaction): void;
}