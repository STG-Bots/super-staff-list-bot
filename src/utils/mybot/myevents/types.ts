import { ClientEvents, Events } from "discord.js"

export type MyEventKey = keyof ClientEvents;

export type MyEventParams<E extends MyEventKey> = ClientEvents[E];

export type MyEventData<E extends MyEventKey> = {
    name: E,
    once?: boolean
}

export interface IMyEvent<E extends MyEventKey> {
    settings: MyEventData<E>;
    execute(...params: MyEventParams<E>): Promise<void>;
}
/* ^ Events ^ */