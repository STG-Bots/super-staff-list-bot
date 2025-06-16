import fs from 'fs';
import { MyCommandInteraction } from '../myInteractions/MyCommandInteraction';
import { MyButtonInteraction } from '../myInteractions/components/MyButtonInteraction';

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

export class CommandsManager extends Manager<MyCommandInteraction> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}

export class ComponentsManager extends Manager<MyButtonInteraction> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}