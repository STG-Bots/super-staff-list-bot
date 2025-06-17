import fs from 'fs';
import { MyComponentInteractions } from '../myInteractions/types';
import { MyComponentInteraction, MyInteraction } from '../myInteractions/MyInteractions';
import { ChatInputCommandInteraction } from 'discord.js';

export default abstract class Manager<T> {
    constructor(readonly folderPath: string) {
        folderPath = folderPath;
    };

    public async loadFiles(): Promise<T[]> {
        const files = fs.readdirSync(this.folderPath, { recursive: true })
        .filter((path: any) => path.endsWith(".ts"))
        .map(async (filePath: any) => (await import(`${this.folderPath}/${filePath}`)).default);
        return (files as T[]);
    }
}

export class CommandsManager extends Manager<MyInteraction<ChatInputCommandInteraction>> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}

export class ComponentsManager extends Manager<MyComponentInteraction> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}