<script setup lang="ts">
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  emit("update:modelValue", value);
};
</script>

<template>
  <textarea
    class="w-full p-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none text-white resize-none"
    :value="modelValue"
    @input="handleInput"
  />
</template>
