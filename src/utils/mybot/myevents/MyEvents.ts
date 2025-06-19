import { Events } from "discord.js";
import { MyEventData } from "./types";

abstract class MyEvent {
    
}

export interface IMyEvent<E = keyof Events> {
    settings: MyEventData<E>;
    execute(...args: any): Promise<void>;
}