import fs from 'fs';
import { MyInteraction } from "../myInteractions/MyInteraction";

export abstract class Manager<T> {
    constructor(readonly folderPath: string) {
        folderPath = folderPath;
    };

    public async loadFiles(): Promise<T[]> {
        const files = fs.readdirSync(this.folderPath, { recursive: true })
        .filter((path: any) => path.endsWith(".ts"))
        .map(async (filePath: any) => await import(`${this.folderPath}/${filePath}`));
        return (files as T[]);
    };
};