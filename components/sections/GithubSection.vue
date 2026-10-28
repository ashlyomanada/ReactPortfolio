<template>
  <section id="github" class="py-20 md:py-28 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <UiSectionHeader
        number="08"
        label="Open Source & Commits"
        title="GitHub & GitLab Activity"
        description="Contribution activity and highlighted repositories across both code platforms."
      />

      <!-- Main GitHub Card -->
      <div class="p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 shadow-xl">
        <!-- Top Metrics Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400">
              <Icon name="logos:github-icon" class="w-6 h-6 dark:brightness-0 dark:invert" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-100 text-lg">@{{ stats?.username || 'ashlyomanada' }}</span>
                <span v-if="stats?.fallback" class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">cached</span>
              </div>
              <div class="text-xs text-slate-400">Public commit timeline & repositories</div>
            </div>
          </div>

          <!-- Quick Stats Pills -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
              <span class="text-slate-400">Contributions:</span>
              <span class="contribution-total text-amber-500 dark:text-emerald-400 font-bold ml-1.5">{{ stats?.totalContributions || 648 }}</span>
            </div>
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
              <span class="text-slate-400">Current Streak:</span>
              <span class="text-amber-500 dark:text-emerald-400 font-bold ml-1.5">{{ stats?.currentStreak || 18 }}d</span>
            </div>
            <a
              :href="`https://github.com/${stats?.username || 'ashlyomanada'}`"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>Follow</span>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <!-- Contribution Matrix (Past 52 Weeks) -->
        <div class="mt-6">
          <div class="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>Annual Activity Heatmap</span>
            <div class="flex items-center gap-1.5 text-[11px]">
              <span>Less</span>
              <span class="w-2.5 h-2.5 rounded-sm contribution-empty" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-1" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-2" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-3" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-4" />
              <span>More</span>
            </div>
          </div>

          <!-- Loading Skeleton -->
          <div v-if="pending" class="h-28 rounded-xl bg-slate-950 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">
            Loading GitHub telemetry...
          </div>

          <!-- Contribution Grid -->
          <div v-else class="overflow-x-auto pb-2">
            <div class="inline-flex gap-1 min-w-[700px]">
              <div
                v-for="(week, wIdx) in stats?.weeks"
                :key="wIdx"
                class="flex flex-col gap-1"
              >
                <div
                  v-for="(day, dIdx) in week.days"
                  :key="dIdx"
                  class="w-2.5 h-2.5 rounded-xs transition-transform hover:scale-125"
                  :class="getColorClass(day.level)"
                  :title="`${day.date}: ${day.count} contributions`"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Top Repositories Grid -->
        <div class="mt-8 pt-6 border-t border-slate-800/80">
          <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Highlighted Repositories</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="repo in stats?.topRepos"
              :key="repo.name"
              class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <a
                    :href="repo.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-mono text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{{ repo.name }}</span>
                    <Icon name="heroicons:arrow-up-right" class="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
                <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {{ repo.description }}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400" />
                  {{ repo.language }}
                </span>
                <span class="flex items-center gap-2">
                  <span class="flex items-center gap-1">★ {{ repo.stars }}</span>
                  <span class="flex items-center gap-1">⑂ {{ repo.forks }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GitLab Contributions -->
      <div class="mt-6 p-6 md:p-8 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <Icon name="logos:gitlab" class="w-6 h-6 dark:brightness-0 dark:invert" />
            </div>
            <div>
              <div class="font-bold text-slate-100 text-lg">GitLab Activity</div>
              <div class="text-xs text-slate-400">{{ gitlabStats?.username }} · Past 12 months</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
              <span class="text-slate-400">Contributions:</span>
              <span class="contribution-total text-amber-500 dark:text-emerald-400 font-bold ml-1.5">{{ gitlabStats?.totalContributions ?? 0 }}</span>
            </div>
            <a
              :href="gitlabStats?.profileUrl || 'https://git.centralizedinc.com/Ashly'"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>View Profile</span>
              <Icon name="heroicons:arrow-top-right-on-square" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div class="mt-6">
          <div class="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>Annual Activity Heatmap</span>
            <div class="flex items-center gap-1.5 text-[11px]">
              <span>Less</span>
              <span class="w-2.5 h-2.5 rounded-sm contribution-empty" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-1" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-2" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-3" />
              <span class="w-2.5 h-2.5 rounded-sm contribution-legend-level-4" />
              <span>More</span>
            </div>
          </div>

          <div v-if="gitlabPending" class="h-28 rounded-xl bg-slate-950 animate-pulse flex items-center justify-center text-xs text-slate-500 font-mono">
            Loading GitLab activity…
          </div>
          <div v-else-if="!gitlabStats?.available" class="rounded-xl border border-slate-800/80 bg-slate-950/50 px-4 py-6 text-center">
            <p class="text-sm text-slate-300">GitLab’s contribution calendar isn’t publicly available right now.</p>
            <div class="mt-3 flex items-center justify-center gap-4">
              <a :href="gitlabStats?.profileUrl || 'https://git.centralizedinc.com/Ashly'" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-amber-500 dark:text-emerald-400 hover:underline">
                Open GitLab profile
              </a>
              <button
                type="button"
                class="text-xs font-mono text-slate-400 hover:text-amber-500 dark:hover:text-emerald-400 disabled:opacity-50"
                :disabled="gitlabPending"
                @click="refreshGitlabStats()"
              >
                Retry
              </button>
            </div>
          </div>
          <div v-else class="overflow-x-auto pb-2">
            <div class="inline-flex gap-1 min-w-[700px]">
              <div v-for="(week, weekIndex) in gitlabStats.weeks" :key="weekIndex" class="flex flex-col gap-1">
                <div
                  v-for="day in week"
                  :key="day.date"
                  class="w-2.5 h-2.5 rounded-xs transition-transform hover:scale-125"
                  :class="getGitlabColorClass(day.level)"
                  :title="`${day.date}: ${day.count} GitLab contributions`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: stats, pending } = await useFetch<any>('/api/github-stats', {
  lazy: true,
  server: false,
})

const { data: gitlabStats, pending: gitlabPending, refresh: refreshGitlabStats } = await useFetch<any>('/api/gitlab-stats?v=2', {
  lazy: false,
  server: true,
})

const getColorClass = (level: number) => {
  switch (level) {
    case 1:
      return 'contribution-cell contribution-level-1 bg-amber-100 border border-amber-200'
    case 2:
      return 'contribution-cell contribution-level-2 bg-amber-300'
    case 3:
      return 'contribution-cell contribution-level-3 bg-amber-500'
    case 4:
      return 'contribution-cell contribution-level-4 bg-amber-700 dark:bg-emerald-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]'
    default:
      return 'contribution-cell contribution-empty bg-[#e2e8f0] dark:bg-[#192629]'
  }
}

const getGitlabColorClass = (level: number) => {
  switch (level) {
    case 1:
      return 'contribution-cell contribution-level-1 bg-amber-100 border border-amber-200'
    case 2:
      return 'contribution-cell contribution-level-2 bg-amber-300'
    case 3:
      return 'contribution-cell contribution-level-3 bg-amber-500'
    case 4:
      return 'contribution-cell contribution-level-4 bg-amber-700 dark:bg-emerald-400'
    default:
      return 'contribution-cell contribution-empty bg-[#e2e8f0] dark:bg-[#192629]'
  }
}
</script>
