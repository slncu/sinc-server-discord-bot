import dayjs, { Dayjs } from 'dayjs'

import 'dayjs/locale/ja'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.locale('ja')
dayjs.extend(isBetween)

export async function sendMessage(channel: any) {
  const messages = await channel.messages.fetch({ limit: 100 })
  const formtted = messages.map((m: any) => ({
    content: m.content,
    date: dayjs(m.createdTimestamp),
  }))
  const overtime = getOverTimes(formtted)
  const [hour, min] = convertMinToHour(overtime)

  const lastMonth = dayjs().month()

  channel.send(
    `${lastMonth}-${
      lastMonth + 1
    }月の残業時間は${hour}時間${min}分でした。お疲れさまでした:+1:`
  )
}

export function getOverTimes(messages: [{ content: string; date: Dayjs }]) {
  const startAt = dayjs()
    .month(dayjs().month() - 1)
    .date(16)
  const endAt = dayjs().date(15)
  const filtered = messages.filter((m) => m.date.isBetween(startAt, endAt))

  const overtime = filtered.reduce((acc, cv) => {
    const parsed = Number(cv.content)
    return acc + parsed
  }, 0)

  return overtime
}

export function convertMinToHour(minute: number): [number, number] {
  const hour = Math.floor(minute / 60)
  const min = minute % 60

  return [hour, min]
}
