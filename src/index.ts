import { Client, Channel } from 'discord.js'
import { config } from './config'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import isBetween from 'dayjs/plugin/isBetween'
import { sendMessage, getOverTimes, convertMinToHour } from './overtime-calc'
import { cronOverTime } from './cron'

dayjs.locale('ja')
dayjs.extend(isBetween)

const client = new Client()

client.login(config.token)

client.on('ready', async () => {
  // 残業時間の算出
  const channel = client.channels.cache.get('778817957621923841')
  if (channel) {
    cronOverTime(channel, sendMessage)
  }
})
