<script setup lang="ts">
import TextEditField from "@/components/editTextField.vue";
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const world = ref("");
const location = ref("");

onMounted(() => {
  world.value = store.worldOpts.world;
  location.value = store.worldOpts.location;
});

const worldChangeHandler = (e: Event) => {
  world.value = (e.target as HTMLTextAreaElement).value;
  store.patch({ world: world.value });
};

const locationChangeHandler = (e: Event) => {
  location.value = (e.target as HTMLTextAreaElement).value;
  store.patch({ location: location.value });
};
</script>

<template>
  <div class="text-white flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6">World Settings</h1>
    <TextEditField
      label="Scenario Rules"
      hintText="Initial scenario and world rules"
      :changeHandler="worldChangeHandler"
      :initialValue="world"
    />
    <TextEditField
      label="Location"
      hintText="General location of scenario, less specific is better"
      :changeHandler="locationChangeHandler"
      :initialValue="location"
    />
  </div>
</template>
