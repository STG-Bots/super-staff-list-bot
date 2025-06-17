import { Events } from "discord.js";
import { MyEventData } from "./types";

abstract class MyEvent {
    
}

export interface IMyEvent<E = keyof Events> {
    settings: MyEventData<E>;
    execute(...args: any): Promise<void>;
}
/*
export abstract class MyInteraction<I extends Interaction> implements IMyInteraction<I> {
    public settings: MyInteractionData<I>;

    constructor(settings: MyInteractionData<I>) {
        this.settings = settings;
    }

    abstract execute(interaction: I): Promise<void>;
}
*/