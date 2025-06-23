import fs from 'fs';
import { MyComponentInteractions } from '../myInteractions/types';
import { MyCommandInteraction, MyComponentInteraction } from '../myInteractions/MyInteractions';
import MyEvent from '../myevents/MyEvents';
import { MyEventKey } from '../myevents/types';

export default abstract class Manager<T> {
    constructor(readonly folderPath: string) {
        folderPath = folderPath;
    };

    public async loadFiles(): Promise<T[]> {
        const files = fs.readdirSync(this.folderPath, { recursive: true })
        .filter((path: any) => path.endsWith(".ts") || path.endsWith(".js"))
        .map(async (filePath: any) => (await import(`${this.folderPath}/${filePath}`)).default);
        return (files as T[]);
    }
}

export class CommandsManager extends Manager<MyCommandInteraction> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}

export class ComponentsManager extends Manager<MyComponentInteraction<MyComponentInteractions>> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}

export class EventsManager extends Manager<MyEvent<MyEventKey>> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    }
}