import { ClientEvents } from "discord.js";
import { IMyEvent, MyEventData, MyEventParams } from "./types";

export default abstract class MyEvent<E extends keyof ClientEvents> implements IMyEvent<E> {
    settings: MyEventData<E>;
    constructor(settings: MyEventData<E>) {
        this.settings = settings;
    }
    abstract execute(...params: MyEventParams<E>): Promise<void>;
}