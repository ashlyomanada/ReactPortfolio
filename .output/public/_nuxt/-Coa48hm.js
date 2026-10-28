import{t as e}from"./DHZ6ee6g.js";import{At as t,I as n,J as r,_ as i,b as a,l as o,p as s,r as c,u as l,ut as u,v as d,z as f}from"./CMT4GqJ7.js";import{u as p}from"./rfhDd3EJ.js";import{n as m}from"./TI0pEWMU.js";import{r as h,t as g}from"#entry";var _={class:`py-24 sm:py-32`},v={class:`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8`},y={class:`flex items-center gap-2 mb-8 text-xs font-mono`},b={class:`text-slate-400 truncate`},x={class:`space-y-4 mb-12`},S={class:`flex items-center gap-3 text-xs font-mono`},C={class:`text-amber-500`},w={class:`text-slate-400`},T={class:`text-3xl sm:text-5xl font-extrabold text-(--text-primary) tracking-tight leading-tight`},E={class:`text-lg text-slate-300 leading-relaxed`},D={class:`flex flex-wrap gap-2 pt-2`},O={class:`prose prose-invert prose-amber max-w-none space-y-6 text-slate-300 leading-relaxed`},k=[`innerHTML`],A={class:`mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6`},j=a({__name:`[slug]`,setup(a){let j=p(),M=o(()=>j.params.slug),N={"architecting-resilient-realtime-systems":{title:`Architecting Resilient Real-Time Systems with Vue 3 & WebRTC`,description:`A deep dive into managing peer connections, low-latency signaling, and resilient state synchronization in distributed frontend applications.`,date:`Feb 18, 2025`,readingTime:`5 min read`,tags:[`Vue.js`,`WebRTC`,`TypeScript`,`Real-Time`],contentHtml:`
      <p>Real-time collaboration and sub-second data streaming are fundamental expectations for modern mission-critical web applications. When designing systems that must tolerate flaky networks, intermittent peer drops, and variable latencies, naive WebSocket and WebRTC implementations rapidly encounter bottlenecks.</p>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">1. Graceful Degradation Under Network Jitter</h3>
      <p>When building real-time applications, the user interface should never freeze or present an ambiguous loading spinner when network latency spikes. State reconciliation strategies like optimistic updates paired with sequence reconciliation ensure that the UI responds instantly while resolving conflicts cleanly in the background.</p>

      <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-amber-300"><code>// Initializing an observable peer connection lifecycle
export function usePeerConnection(config: RTCConfiguration) {
  const connectionState = ref&lt;RTCPeerConnectionState&gt;('new')
  const pc = new RTCPeerConnection(config)

  pc.onconnectionstatechange = () => {
    connectionState.value = pc.connectionState
    if (pc.connectionState === 'failed') {
      attemptReconnection(pc)
    }
  }

  return { pc, connectionState }
}</code></pre>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">2. Managing Distributed State with Nuxt & Pinia</h3>
      <p>By isolating peer messaging from DOM presentation logic, Vue's Composition API allows us to encapsulate real-time streams into clean, testable composables that seamlessly synchronize across route changes.</p>
    `},"zero-cost-optimizations-nuxt4-tailwind4":{title:`Zero-Cost Performance Optimizations with Nuxt 4 & Tailwind CSS v4`,description:`How Vite-native CSS processing, fluid typography clamps, and island hydration patterns drive 99+ mobile Lighthouse scores.`,date:`Jan 24, 2025`,readingTime:`4 min read`,tags:[`Nuxt 4`,`Tailwind v4`,`Web Vitals`],contentHtml:`
      <p>Shipping fast web applications isn't merely about stripping out code—it's about orchestrating asset loading, avoiding layout shifts, and leveraging next-generation compilation pipelines.</p>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">1. CSS-First Design Tokens</h3>
      <p>With Tailwind CSS v4, the build configuration lives directly in CSS via <code>@theme</code>. This removes the legacy JavaScript configuration overhead and allows Vite's lightning-fast Lightning CSS engine to process design tokens natively.</p>

      <pre class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-amber-300"><code>/* Tailwind v4 CSS-first config */
@theme {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --color-accent: #f59e0b;
}

:root {
  --fluid-h1: clamp(2.25rem, 1.8rem + 2.25vw, 4.5rem);
}</code></pre>

      <h3 class="text-xl font-bold text-slate-100 mt-8 mb-4">2. Eliminating Hydration Overhead</h3>
      <p>With Nuxt 4's component hydration directives like <code>hydrate-on-visible</code>, below-the-fold interactive widgets—such as terminal emulators, complex interactive graphs, and modals—remain inert until they scroll into the viewport, freeing up the main thread for instant Time to Interactive (TTI).</p>
    `}},P=o(()=>N[M.value]||{title:`Engineering Article`,description:`Technical notes by Ashly Omanada`,date:`2025`,readingTime:`3 min read`,tags:[`Tech`],contentHtml:`<p>Article content coming soon.</p>`});return m({title:o(()=>`${P.value.title} — Ashly Omanada`),meta:[{name:`description`,content:o(()=>P.value.description)}]}),(a,o)=>{let p=h,m=e;return n(),s(`div`,_,[l(`div`,v,[l(`div`,y,[d(p,{to:`/`,class:`text-amber-500 hover:underline`},{default:r(()=>[...o[0]||=[i(`Home`,-1)]]),_:1}),o[2]||=l(`span`,{class:`text-slate-600`},`/`,-1),d(p,{to:`/blog`,class:`text-amber-500 hover:underline`},{default:r(()=>[...o[1]||=[i(`Blog`,-1)]]),_:1}),o[3]||=l(`span`,{class:`text-slate-600`},`/`,-1),l(`span`,b,t(u(P).title),1)]),l(`header`,x,[l(`div`,S,[l(`span`,C,t(u(P).date),1),o[4]||=l(`span`,{class:`text-slate-600`},`•`,-1),l(`span`,w,t(u(P).readingTime),1)]),l(`h1`,T,t(u(P).title),1),l(`p`,E,t(u(P).description),1),l(`div`,D,[(n(!0),s(c,null,f(u(P).tags,e=>(n(),s(`span`,{key:e,class:`px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 text-amber-400 border border-slate-800`},` #`+t(e),1))),128))])]),l(`article`,O,[l(`div`,{innerHTML:u(P).contentHtml},null,8,k)]),l(`div`,A,[o[6]||=l(`div`,{class:`flex items-center gap-3`},[l(`img`,{src:g,alt:`Ashly Omanada`,class:`w-12 h-12 rounded-full object-cover border border-amber-500/40`}),l(`div`,null,[l(`div`,{class:`text-sm font-bold text-slate-100`},`Ashly Omanada`),l(`div`,{class:`text-xs text-slate-400`},`Full-Stack Developer • Calapan City, PH`)])],-1),d(p,{to:`/blog`,class:`text-xs font-mono text-amber-500 hover:underline flex items-center gap-1.5 self-start sm:self-auto`},{default:r(()=>[d(m,{name:`heroicons:arrow-left`,class:`w-4 h-4`}),o[5]||=l(`span`,null,`Back to all articles`,-1)]),_:1})])])])}}});export{j as default};