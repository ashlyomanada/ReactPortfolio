const gitlabUsername = 'Ashly'
const gitlabProfileUrl = `https://git.centralizedinc.com/${gitlabUsername}`
const gitlabCalendarUrl = `https://git.centralizedinc.com/users/${gitlabUsername}/calendar.json`

type ContributionDay = {
  date: string
  count: number
  level: number
}

export default defineEventHandler(async (event) => {
  try {
    const calendar = await $fetch<Record<string, number>>(
      gitlabCalendarUrl,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Ashly-Portfolio-App',
        },
        timeout: 10000,
      },
    )
    if (!calendar || typeof calendar !== 'object' || !Object.keys(calendar).some((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))) {
      throw new Error('GitLab did not return a contribution calendar')
    }
    const weeks = buildContributionWeeks(calendar)
    setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300')

    return {
      available: true,
      username: gitlabUsername,
      profileUrl: gitlabProfileUrl,
      totalContributions: weeks.flat().reduce((total, day) => total + day.count, 0),
      weeks,
    }
  } catch (error) {
    console.error('[gitlab-stats] Failed to fetch the public contribution calendar:', error)
    setHeader(event, 'Cache-Control', 'no-store')
    return {
      available: false,
      username: gitlabUsername,
      profileUrl: gitlabProfileUrl,
      totalContributions: 0,
      weeks: [],
    }
  }
})

function buildContributionWeeks(calendar: Record<string, number>): ContributionDay[][] {
  const today = new Date()
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 364)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())

  const weeks: ContributionDay[][] = []
  const cursor = new Date(start)

  while (cursor <= end || cursor.getUTCDay() !== 0) {
    const week: ContributionDay[] = []

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const date = cursor.toISOString().slice(0, 10)
      const count = Number(calendar[date] ?? 0)
      week.push({
        date,
        count,
        level: count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4,
      })
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }

    weeks.push(week)
  }

  return weeks
}
