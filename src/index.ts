import { Client, Message } from "discord.js";
import { config } from "./config";

const client = new Client();

interface ReplyInterface {
  messageReply(message: Message): Promise<void>;
}

class Reply implements ReplyInterface {
  public async messageReply(message: Message): Promise<void> {
    if (message.author.bot) {
      return;
    } else if (message.content === "こんにちは") {
      message.reply("こんにちは！");
    }
  }
}

const reply = new Reply();

client.on("message", (message) => reply.messageReply(message));

client.login(config.token);
