<script setup lang="ts">
import { ref } from "vue";

const expanded = ref(true);

const toggle = () => {
  expanded.value = !expanded.value;
};

interface Props {
  label: string;
}
defineProps<Props>();
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center text-slate-200">
      <p>{{ label }}</p>
      <div class="flex-grow" />
      <button @click="toggle">
        <svg
          class="text-zinc-500 transition-transform duration-200"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 9L12 15L6 9" stroke="currentColor" stroke-width="2" />
          <path v-if="expanded" d="M17 18L7 18" stroke="currentColor" />
        </svg>
      </button>
    </div>
    <div v-if="expanded" class="mt-2 p-2 border border-zinc-700 rounded">
      <slot></slot>
    </div>
  </div>
</template>
