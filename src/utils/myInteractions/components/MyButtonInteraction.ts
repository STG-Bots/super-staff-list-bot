import { ButtonInteraction } from 'discord.js';
import { MyComponentInteractionSettings } from './types';
import { MyInteraction } from '../MyInteraction';

export abstract class MyButtonInteraction extends MyInteraction<MyComponentInteractionSettings, ButtonInteraction> {
    constructor(settings: MyComponentInteractionSettings) {
        super(settings);
    }
}