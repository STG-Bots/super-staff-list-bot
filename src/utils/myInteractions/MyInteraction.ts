import { Interaction, PermissionFlags } from 'discord.js';

export type MyInteractionSettings = {
    botPermissions: PermissionFlags[],
    memberPermissions: PermissionFlags[],
    onlyDevs: boolean,
}

export abstract class MyInteraction<S extends MyInteractionSettings, I extends Interaction> {
    public settings: S;

    constructor(settings: S) {
        this.settings = settings;
    }

    abstract execute(interaction: I): void;
}