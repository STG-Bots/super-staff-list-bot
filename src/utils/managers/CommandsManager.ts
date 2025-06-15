import { MyCommandInteraction } from '../myInteractions/MyCommandInteraction';
import { Manager } from './Manager';

export class CommandsManager extends Manager<MyCommandInteraction> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    };
};

async function main() {
    const files = await Promise.all(await new CommandsManager("../../commands").loadFiles());
    console.log(files[0]);
}

main();
