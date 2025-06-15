import fs from 'fs';
import { MyInteraction } from "../myInteractions/MyInteraction";

interface IManager {
    readonly folderPath: string;
    files: MyInteraction[];
    loadFiles(folderPath: string): void;
};

export abstract class Manager implements IManager {
    files: MyInteraction[];
    constructor(readonly folderPath: string) {
        this.files = await this.loadFiles();
    };

    public async loadFiles(): Promise<MyInteraction[]> {
        const files = fs.readdirSync(this.folderPath, { recursive: true })
        .filter((path: any) => path.endsWith(".ts"))
        .map(async (filePath: any) => await import(`${this.folderPath}/${filePath}`));
        return (files as unknown as MyInteraction[]);
    };
};