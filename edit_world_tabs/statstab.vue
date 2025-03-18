<script setup lang="ts">
import TextEditField from "@/components/editTextField.vue";
import { useAppStore } from "@/stores/app";

const store = useAppStore();
</script>

<template>
  <div class="text-white p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6">Player Stats</h1>

    <TextEditField
      label="Stat"
      hintText="stat goes here"
      :changeHandler="(e) => console.log(e)"
      minRows="1"
    />
  </div>
</template>
