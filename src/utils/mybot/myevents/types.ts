import { Events } from "discord.js"

export type MyEventData<E = keyof Events> = {
    name: E,
    once?: boolean
}

export type MyEventParams<E = keyof Events>

const event1: MyEventData<Events.MessageCreate> = {
    name: Events.MessageCreate

};

/* ^ Events ^ */