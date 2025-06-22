import { ClientEvents, Events } from "discord.js"

export type MyEventParams<E extends keyof ClientEvents> = ClientEvents[E];

export type MyEventData<E extends keyof ClientEvents> = {
    name: E,
    once?: boolean
}

export interface IMyEvent<E extends keyof ClientEvents> {
    settings: MyEventData<E>;
    execute(...params: MyEventParams<E>): Promise<void>;
}
/* ^ Events ^ */