import { Manager } from './Manager';

export class CommandsManager extends Manager<string> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    };
};

console.log(new CommandsManager("../../commands"));