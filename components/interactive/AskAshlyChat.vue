<template>
  <div class="fixed bottom-6 right-6 z-40">
    <!-- Collapsed Floating Button Trigger -->
    <button
      v-if="!isOpen"
      type="button"
      class="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 border border-amber-500/40 text-white shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      aria-label="Open Ask Ashly AI Assistant"
      @click="toggleChat"
    >
      <div class="relative flex items-center justify-center">
        <span class="absolute w-3 h-3 rounded-full bg-amber-400 animate-ping opacity-75" />
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500" />
      </div>
      <Icon name="heroicons:chat-bubble-bottom-center-text" class="w-5 h-5 text-amber-400" />
      <span class="text-sm font-semibold tracking-wide">Ask Ashly <span class="text-xs text-amber-400 font-mono">AI</span></span>
    </button>

    <!-- Expanded Chat Window -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-2xl glass-panel bg-slate-950/95 border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        <!-- Header -->
        <div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img
                src="/images/portrait.png"
                alt="Ashly Avatar"
                class="w-8 h-8 rounded-full object-cover border border-amber-500/40"
              />
              <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>
            <div>
              <div class="text-sm font-semibold flex items-center gap-1.5">
                <span>Ask Ashly</span>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">AI</span>
              </div>
              <div class="text-[11px] text-slate-400">Grounded in verified profile data</div>
            </div>
          </div>
          <button
            type="button"
            class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Chat"
            @click="toggleChat"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <!-- Chat History -->
        <div ref="chatContainerRef" class="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
          <!-- Initial Welcome message -->
          <div class="flex items-start gap-2.5">
            <div class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-amber-500/30">
              A
            </div>
            <div class="p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed text-xs sm:text-sm">
              Hi! I'm Ashly's AI assistant. Ask me anything about his flagship projects (like EUPER), full-stack architecture, or current availability!
            </div>
          </div>

          <!-- Suggested Quick Chips (visible if few messages) -->
          <div v-if="messages.length === 0" class="pt-2 flex flex-wrap gap-1.5">
            <button
              v-for="chip in quickPrompts"
              :key="chip"
              type="button"
              class="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-amber-500/10 hover:text-amber-300 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors text-left"
              @click="sendPrompt(chip)"
            >
              {{ chip }}
            </button>
          </div>

          <!-- Message list -->
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex items-start gap-2.5"
            :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
          >
            <div
              v-if="msg.role === 'assistant'"
              class="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-amber-500/30"
            >
              A
            </div>
            <div
              class="p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%]"
              :class="msg.role === 'user' ? 'rounded-tr-sm bg-amber-500 text-slate-950 font-medium' : 'rounded-tl-sm bg-slate-900 border border-slate-800 text-slate-200'"
            >
              {{ msg.content }}
            </div>
          </div>

          <!-- Loading typing indicator -->
          <div v-if="isLoading" class="flex items-center gap-2 text-slate-400 text-xs">
            <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/30">
              A
            </div>
            <div class="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="p-3 bg-slate-900/90 border-t border-slate-800">
          <form class="flex items-center gap-2" @submit.prevent="handleSubmit">
            <input
              v-model="inputQuery"
              type="text"
              placeholder="Ask about Ashly's work..."
              class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              :disabled="isLoading"
            />
            <button
              type="submit"
              class="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 transition-colors flex-shrink-0"
              :disabled="isLoading || !inputQuery.trim()"
              aria-label="Send message"
            >
              <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const inputQuery = ref('')
const isLoading = ref(false)
const chatContainerRef = ref<HTMLElement | null>(null)

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])

const quickPrompts = [
  'What is Ashly’s flagship project?',
  'What is his primary tech stack?',
  'Is Ashly open for hire?',
  'Tell me about the EUPER system',
]

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const sendPrompt = (text: string) => {
  inputQuery.value = text
  handleSubmit()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
    }
  })
}

const handleSubmit = async () => {
  const query = inputQuery.value.trim()
  if (!query || isLoading.value) return

  messages.value.push({ role: 'user', content: query })
  inputQuery.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const res = await $fetch<{ success: boolean; reply: string }>('/api/chat', {
      method: 'POST',
      body: { messages: messages.value },
    })

    if (res && res.reply) {
      messages.value.push({ role: 'assistant', content: res.reply })
    } else {
      messages.value.push({
        role: 'assistant',
        content: 'Ashly specializes in Vue 3, Nuxt 4, TypeScript, and Node.js. Feel free to contact him at ashlyomanada.dev@gmail.com!',
      })
    }
  } catch (err) {
    messages.value.push({
      role: 'assistant',
      content: 'Ashly is a full-stack developer specializing in Vue, Nuxt, and Node. You can email him at ashlyomanada.dev@gmail.com.',
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>
