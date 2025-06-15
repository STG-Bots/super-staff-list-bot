import { ComponentInteraction } from '../myInteractions/components/MyComponentInteraction';
import { Manager } from './Manager';

export class ComponentsManager extends Manager<ComponentInteraction> {
    constructor(readonly folderPath: string) {
        super(folderPath);
    };
};

async function main() {
    const files = await Promise.all(await new ComponentsManager("../../components").loadFiles());
    console.log(files[0]);
}

main();
