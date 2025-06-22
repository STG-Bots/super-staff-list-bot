import { Client, Events } from "discord.js";
import MyEvent from "../../utils/mybot/myevents/MyEvents";

class TestEvent extends MyEvent<Events.ClientReady> {
    constructor() {
        super({
            name: Events.ClientReady
        });
    }
    async execute(client: Client<true>): Promise<void> {
        
    }
}

export default new TestEvent();