import { ButtonInteraction } from 'discord.js';
import { MyComponentInteraction, MyComponentInteractionSettings } from './MyComponentInteraction';

export abstract class MyButtonInteraction extends MyComponentInteraction {
    constructor(settings: MyComponentInteractionSettings) {
        super(settings);
    }

    abstract execute(interaction: ButtonInteraction): void;
}