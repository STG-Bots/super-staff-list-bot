import { Interaction, PermissionFlags } from 'discord.js';

export type MyInteractionSettings = {
    botPermissions: PermissionFlags[],
    memberPermissions: PermissionFlags[],
    onlyDevs: boolean,
}

export interface IMyInteraction {
    settings: MyInteractionSettings,
    execute(interaction: Interaction): void;
}

export abstract class MyInteraction implements IMyInteraction {
    public settings: MyInteractionSettings;

    constructor(settings: MyInteractionSettings) {
        this.settings = settings;
    }

    abstract execute(interaction: Interaction): void;
}