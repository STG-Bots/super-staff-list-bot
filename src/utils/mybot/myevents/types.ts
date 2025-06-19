import { ClientEvents, Events } from "discord.js"

type EventParams<K extends Events> = {[K in keyof Events]: Events}

export interface IMyEvent<E extends Events> {
    execute(param:): void;
}
/* ^ Events ^ */