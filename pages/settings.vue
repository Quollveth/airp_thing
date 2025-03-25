<script setup lang="ts">
import Swal from "sweetalert2";

import TabNavigation from "@/components/navbar.vue";
import endpointTab from "@/settings_tabs/enpoints.vue";
import promptsTab from "@/settings_tabs/prompts.vue";
import StyledButton from "@/components/styled/button.vue";

import { useSettingsStore } from "@/stores/app";

const store = useSettingsStore();

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

const save = async () => {
  const { value: fileName } = await Swal.fire({
    title: "Downloading...",
    inputLabel: "Filename",
    input: "text",
    showCancelButton: true,
    theme: "dark",
  });

  if (!fileName) {
    return;
  }

  const jason = JSON.stringify(
    {
      logic: store.logicModel,
      narration: store.rpModel,
    },
    null,
    2,
  );
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jason);
  const dlAnchor = document.createElement("a") as HTMLAnchorElement;

  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", fileName + ".json");

  dlAnchor.click();
};

const render = ref(true);
const resetSettings = async (e: Event) => {
  store.reset("logic");
  store.reset("rp");

  render.value = false;
  await nextTick();
  render.value = true;
};

const load = async () => {
  const fileIn = document.createElement("input") as HTMLInputElement;
  fileIn.setAttribute("type", "file");

  fileIn.addEventListener("change", (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const jason = JSON.parse(reader.result as string);
        store.reset("logic");
        store.reset("rp");
        store.patchModel("logic", jason.logic);
        store.patchModel("rp", jason.narration);

        render.value = false;
        await nextTick();
        render.value = true;
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
  <div class="flex flex-col" v-if="render">
    <div class="flex justify-center gap-5 my-6">
      <StyledButton @click="goBack"> Back </StyledButton>
      <StyledButton @click="resetSettings"> Reset</StyledButton>
      <StyledButton @click="save"> Save </StyledButton>
      <StyledButton @click="load"> Load </StyledButton>
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
