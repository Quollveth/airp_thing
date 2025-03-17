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
    class="relative overflow-hidden px-6 py-3 rounded-lg font-medium border-2 border-zinc-700 hover:bg-zinc-700 active:scale-95 transition duration-300"
  >
    {{ text }}
  </button>
</template>
