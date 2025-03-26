<script setup lang="ts">
import type { Stat } from "@/stores/types";

import StatBar from "./statBar.vue";

interface Props {
  stat: Stat;
}
defineProps<Props>();
</script>

<template>
  <div class="mb-6 p-4">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-zinc-300">{{ stat.name }}</h2>
      <p class="text-xl font-bold text-amber-600">{{ stat.current }}</p>
    </div>
    <div class="flex items-center gap-4">
      <p class="text-gray-500 text-sm">{{ stat.min }}</p>
      <StatBar :value="stat.current" class="flex-grow" />
      <p class="text-gray-500 text-sm">{{ stat.max }}</p>
    </div>
  </div>
</template>
