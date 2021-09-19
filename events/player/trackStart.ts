import { Queue, Track } from "discord-player";
import { TextChannel } from "discord.js";
import BopClient from "../../lib/Client";
import { Event } from "../../lib/Modules";
import { MusicEmbed } from "../../lib/util/Embeds";

export default class TrackAddEvent extends Event {
  constructor(client: BopClient, directory: string) {
    super(client, directory, {
      name: "trackStart",
      emitter: "player",
    });
  }

  public main(queue: Queue, track: Track): void {
    const channel = queue.metadata as TextChannel;
    const nowPlayingEmbed = new MusicEmbed(track, true);
    channel.send({ embeds: [nowPlayingEmbed] });
  }
}
