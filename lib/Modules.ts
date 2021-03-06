import {  Message } from "discord.js";
import { sep } from "path";
import BopClient from "./Client";

interface baseOpts {
  name?: string;
  enabled?: boolean;
}

interface eventOpts extends baseOpts {
  once?: boolean;
  emitter: string
}

interface commandOpts extends baseOpts {
  aliases?: string[];
  description: string;
  usage?: string[];
  cooldown: number;
}

function getFileName(dir: string): string {
    const paths = dir.split(sep);
    return paths[paths.length - 1].split(".")[0];
}

class Module {
  protected client: BopClient;
  public name: string;
  public enabled: boolean;
  public directory: string;

  constructor(client: BopClient, directory: string, options: baseOpts = {}) {
      this.client = client;
      this.directory = directory;
      this.name = options.name ?? getFileName(directory);
      this.enabled = options.enabled ?? true;
  }

  public async init(): Promise<unknown> {
      return;
  }
}

class Command extends Module {
  public description: string;
  public usage: string[];
  public aliases: string[];
  public cooldown: number;

  constructor(client: BopClient, directory: string, options: commandOpts) {
      super(client, directory, options);
      this.description = options.description;
      this.usage = options.usage ?? [];
      this.aliases = options.aliases ?? [];
      this.cooldown = options.cooldown;
  }

  public main(message: Message, args: string[]): void {
      throw new Error("Not Implemented");
  }
}

class Event extends Module {
  public once: boolean;
  public emitter: string;

  constructor(client: BopClient, directory: string, options: eventOpts) {
      super(client, directory, options);
      this.emitter = options.emitter;
      this.once = options.once ?? false;
  }

  public main(...args: readonly unknown[]): void {
      throw new Error("Not implemented");
  }
}

class Inhibitor extends Module {
    public check(message: Message, command: Command): boolean {
        throw new Error("Not implemented");
    }

    public main(message: Message): void {
        throw new Error("Not implemented");
    }
}

export { Module, Command, Event, Inhibitor };

