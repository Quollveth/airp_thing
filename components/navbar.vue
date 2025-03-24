<script setup lang="ts">
import StyledButton from "@/components/styled/button.vue";
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
  <div class="min-h-screen flex flex-col items-center p-1">
    <div class="flex space-x-4 mb-6">
      <StyledButton
        v-for="(page, index) in pages"
        :key="index"
        @click="currentPage = index"
        :class="{ 'bg-zinc-700': currentPage === index }"
      >
        {{ page.label }}
      </StyledButton>
    </div>
    <div
      class="w-full max-w-3xl p-6 rounded-xl shadow-lg border-2 border-zinc-700"
    >
      <component :is="pages[currentPage].content"></component>
    </div>
  </div>
</template>
