<script setup lang="ts">
import Hint from "@/components/hintIcon.vue";

interface Props {
  hintText: string;
  label: string;
  changeHandler: (arg0: Event) => void;
  initialValue?: string;
  minRows?: number;
  fieldId?: string;
  noHint?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="w-full max-w-lg mb-6">
    <div class="flex">
      <Hint :text="hintText" v-if="!noHint" />
      <label :for="fieldId" class="block text-lg font-semibold mb-2">{{
        label
      }}</label>
    </div>
    <textarea
      :value="initialValue"
      :id="fieldId"
      class="w-full p-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none text-white resize-none"
      :rows="minRows ?? 4"
      @input="changeHandler"
    ></textarea>
  </div>
</template>
