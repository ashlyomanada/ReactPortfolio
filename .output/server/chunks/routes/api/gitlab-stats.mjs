import { d as defineEventHandler, s as setHeader } from '../../nitro/nitro.mjs';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'mdream';
import 'process';
import 'buffer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'lru-cache';
import 'node:crypto';
import 'node:async_hooks';
import '@mdream/js/negotiate';
import 'consola';
import 'node:url';
import '@iconify/utils';
import 'fast-xml-parser';
import 'ipx';

const gitlabUsername = "Ashly";
const gitlabProfileUrl = `https://git.centralizedinc.com/${gitlabUsername}`;
const gitlabCalendarUrl = `https://git.centralizedinc.com/users/${gitlabUsername}/calendar.json`;
const gitlabStats = defineEventHandler(async (event) => {
  try {
    const calendar = await $fetch(
      gitlabCalendarUrl,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Ashly-Portfolio-App"
        },
        timeout: 1e4
      }
    );
    if (!calendar || typeof calendar !== "object" || !Object.keys(calendar).some((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))) {
      throw new Error("GitLab did not return a contribution calendar");
    }
    const weeks = buildContributionWeeks(calendar);
    setHeader(event, "Cache-Control", "public, max-age=300, s-maxage=300");
    return {
      available: true,
      username: gitlabUsername,
      profileUrl: gitlabProfileUrl,
      totalContributions: weeks.flat().reduce((total, day) => total + day.count, 0),
      weeks
    };
  } catch (error) {
    console.error("[gitlab-stats] Failed to fetch the public contribution calendar:", error);
    setHeader(event, "Cache-Control", "no-store");
    return {
      available: false,
      username: gitlabUsername,
      profileUrl: gitlabProfileUrl,
      totalContributions: 0,
      weeks: []
    };
  }
});
function buildContributionWeeks(calendar) {
  var _a;
  const today = /* @__PURE__ */ new Date();
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const weeks = [];
  const cursor = new Date(start);
  while (cursor <= end || cursor.getUTCDay() !== 0) {
    const week = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const date = cursor.toISOString().slice(0, 10);
      const count = Number((_a = calendar[date]) != null ? _a : 0);
      week.push({
        date,
        count,
        level: count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export { gitlabStats as default };
//# sourceMappingURL=gitlab-stats.mjs.map
