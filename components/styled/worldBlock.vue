<script setup lang="ts">
interface Props {
  onClick: (arg0: Event) => void;
}

defineProps<Props>();
</script>

<template>
  <button
    class="cursor-pointer flex flex-col items-center justify-center w-full max-w-md p-6 bg-zinc-700 hover:bg-zinc-600 border-2 border-zinc-500 hover:border-zinc-400 rounded-lg"
    @click="onClick"
  >
    <label
      class="flex flex-col items-center space-y-3 text-zinc-400 cursor-pointer"
      @click="onClick"
    >
      <slot></slot>
    </label>
  </button>
</template>
