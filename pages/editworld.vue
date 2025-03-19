<script setup lang="ts">
import Swal from "sweetalert2";
import TabNavigation from "@/components/navbar.vue";

import worldtab from "@/edit_world_tabs/worldtab.vue";
import entitiestab from "@/edit_world_tabs/entitiestab.vue";
import statstab from "@/edit_world_tabs/statstab.vue";

import { useAppStore } from "@/stores/app";

const store = useAppStore();

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

const save = () => {
  const jason = JSON.stringify(store.worldOpts, null, 2);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jason);
  const dlAnchor = document.createElement("a") as HTMLAnchorElement;

  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "airp_save.json");

  dlAnchor.click();
};

const load = () => {
  const fileIn = document.createElement("input") as HTMLInputElement;
  fileIn.setAttribute("type", "file");

  fileIn.addEventListener("change", (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jason = JSON.parse(reader.result as string);
        store.patch(jason);
      } catch (e) {
        Swal.fire({
          title: "Invalid JSON",
          text: "Your file sucks ass, use a good one next time dumbass.",
          icon: "error",
          theme: "dark",
        });
      }
    };

    reader.readAsText(file);
  });

  fileIn.click();
};
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
