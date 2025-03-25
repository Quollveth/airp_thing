<script setup lang="ts">
const expanded = ref(false);

const toggle = () => {
  expanded.value = !expanded.value;
};

interface Props {
  right?: boolean;
  label: string;
}
defineProps<Props>();
</script>

<template>
  <div class="z-11 h-10">
    <button @click="toggle" class="mx-2 flex-col items-center text-sm">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6H20M4 12H20M4 18H20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p>{{ label }}</p>
    </button>
  </div>
  <div
    v-if="expanded"
    class="fixed top-0 h-full w-1/3 shadow-xl border-zinc-700 bg-zinc-800 z-10 transition-transform duration-300 flex-col"
    :class="right ? 'right-0 border-l-2' : 'left-0 border-r-2'"
  >
    <div class="h-15" />
    <slot></slot>
  </div>
</template>
