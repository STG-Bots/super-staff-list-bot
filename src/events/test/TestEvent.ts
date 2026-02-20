import { Client, Events, Status } from "discord.js";
import MyEvent from "../../utils/mybot/myevents/MyEvents";

class TestEvent extends MyEvent<Events.ClientReady> {
    constructor() {
        super({
            name: Events.ClientReady
        });
    }
    async execute(client: Client<true>): Promise<void> {
        client.user.setPresence({
            activities: [{ name: "ON", state: "online" }]
        })
        console.log(client.user.username);
    }
}

export default new TestEvent();