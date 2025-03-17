<script setup lang="ts">
type pageTab = {
  label: string;
  content: Component;
};

interface Props {
  pages: pageTab[];
}
defineProps<Props>();

const currentPage = ref<number>(0);
</script>

<template>
  <div class="min-h-screen flex flex-col items-center p-6">
    <div class="flex space-x-4 mb-6">
      <button
        v-for="(page, index) in pages"
        :key="index"
        @click="currentPage = index"
        class="px-4 py-2 rounded-lg transition duration-300 hover:bg-zinc-600 border-2 border-zinc-700"
        :class="{ 'bg-zinc-700': currentPage === index }"
      >
        {{ page.label }}
      </button>
    </div>
    <div
      class="w-full max-w-3xl p-6 rounded-xl shadow-lg border-2 border-zinc-700"
    >
      <component :is="pages[currentPage].content"></component>
    </div>
  </div>
</template>
