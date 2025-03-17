<script setup lang="ts">
interface Props {
  text: string;
  onPress: () => void;
}

defineProps<Props>();
</script>

<template>
  <button
    @click="onPress"
    class="relative overflow-hidden px-6 py-3 rounded-lg font-medium text-white bg-gray-800 dark:bg-gray-900 shadow-lg transition hover:bg-gray-700 dark:hover:bg-gray-800 active:scale-95"
  >
    {{ text }}
  </button>
</template>
