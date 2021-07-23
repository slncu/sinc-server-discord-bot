import cron from 'node-cron'
import { ChannelManager } from 'discord.js'

// * * 15 15 * *
export function cronOverTime(channel: any, cb: any) {
  cron.schedule('* * 15 15 * *', () => cb(channel))
}
