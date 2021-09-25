import { Queue } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../../lib/Client";
import { Event } from "../../../lib/Modules";
import { Notification } from "../../../lib/util/Embeds";

export default class BotDisconnectEvent extends Event {
    constructor(client: BopClient, directory: string) {
        super(client, directory, {
            name: "error",
            emitter: "player",
        });
    }

    public main(queue: Queue, error: Error): void {
        const channel = queue.metadata as TextChannel;
        queue.destroy();

        channel.send({
            embeds: [new Notification("An error occurred, disconnecting!")],
        });
        this.client.console.error(error);
    }
}