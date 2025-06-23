import { ClientEvents } from "discord.js";
import { IMyEvent, MyEventData, MyEventKey, MyEventParams } from "./types";

export default abstract class MyEvent<E extends MyEventKey> implements IMyEvent<E> {
    settings: MyEventData<E>;
    constructor(settings: MyEventData<E>) {
        this.settings = settings;
    }
    abstract execute(...params: MyEventParams<E>): Promise<void>;
}