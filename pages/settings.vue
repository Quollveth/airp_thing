<script setup lang="ts">
import Swal from "sweetalert2";

import TabNavigation from "@/components/navbar.vue";
import endpointTab from "@/settings_tabs/enpoints.vue";
import promptsTab from "@/settings_tabs/prompts.vue";

const goBack = () => {
  Swal.fire({
    title: "Go back to menu?",
    text: "Your changes will be saved automatically",
    showConfirmButton: true,
    showCancelButton: true,
    theme: "dark",
  }).then((result) => {
    if (result.isConfirmed) {
      navigateTo("/");
    }
  });
};

const save = () => {};

const render = ref(true);
const load = () => {};
</script>

<template>
  <div class="flex flex-col" v-if="render">
    <div class="flex justify-center gap-5 my-6">
      <button
        class="px-4 py-2 rounded-lg transition duration-300 hover:bg-zinc-600 border-2 border-zinc-700"
        @click="goBack"
      >
        Back
      </button>
      <button
        class="px-4 py-2 rounded-lg transition duration-300 hover:bg-zinc-600 border-2 border-zinc-700"
        @click="save"
      >
        Save
      </button>
      <button
        class="px-4 py-2 rounded-lg transition duration-300 hover:bg-zinc-600 border-2 border-zinc-700"
        @click="load"
      >
        Load
      </button>
    </div>

    <div class="flex flex-grow" />
    <TabNavigation
      :pages="[
        {
          label: 'Endpoints',
          content: endpointTab,
        },
        {
          label: 'Prompts',
          content: promptsTab,
        },
      ]"
    />
  </div>
</template>
