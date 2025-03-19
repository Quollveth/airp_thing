<script setup lang="ts">
import Swal from "sweetalert2";
import TabNavigation from "@/components/navbar.vue";

import worldtab from "@/edit_world_tabs/worldtab.vue";
import entitiestab from "@/edit_world_tabs/entitiestab.vue";
import statstab from "@/edit_world_tabs/statstab.vue";

const goBack = () => {
  Swal.fire({
    title: "Exit the editor?",
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
</script>

<template>
  <div class="flex flex-col">
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
    </div>

    <div class="flex flex-grow" />
    <TabNavigation
      :pages="[
        {
          label: 'World',
          content: worldtab,
        },
        {
          label: 'Entities',
          content: entitiestab,
        },
        {
          label: 'Stats',
          content: statstab,
        },
      ]"
    />
  </div>
</template>
