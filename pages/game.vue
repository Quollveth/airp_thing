<script setup lang="ts">
import type { World, Agent } from "@/stores/types";
import type { Message } from "@/stores/app";

import { useWorldStore, useSettingsStore, useGameStore } from "@/stores/app";
import StyledTextArea from "@/components/styled/textField.vue";
import StyledButton from "@/components/styled/button.vue";
import Drawer from "@/components/drawer.vue";
import StatRender from "@/game_components/statRender.vue";

definePageMeta({
  middleware: (to, from) => {
    //TODO: REMOVE DEBUG
    return;

    if (from.path == "/newgame" || from.path == "/settings") {
      return;
    }
    return navigateTo("/newgame");
  },
});

const worldStore = useWorldStore();
const settingsStore = useSettingsStore();
const gameStore = useGameStore();

const worldOpts = ref<World>();
const rpAgent = ref<Agent>();
const logicAgent = ref<Agent>();
const gameState = ref<Message[]>();

onMounted(() => {
  worldOpts.value = worldStore.worldOpts;
  rpAgent.value = settingsStore.rpModel;
  logicAgent.value = settingsStore.logicModel;
  gameState.value = gameStore.history;
});
</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center p-6 gap-4 z-1">
    <div class="flex justify-between w-full">
      <Drawer label="World"><h1></h1></Drawer>
      <h1 class="text-4xl font-bold">
        {{ worldOpts?.title ?? "Untitled Wolrd" }}
      </h1>
      <Drawer right label="Stats">
        <div class="flex-col" v-if="worldOpts?.stats !== undefined">
          <StatRender v-for="stat in worldOpts!.stats" :stat="stat" />
        </div>
      </Drawer>
    </div>

    <StyledTextArea readonly class="flex-1" />
    <div class="flex gap-2 w-full">
      <StyledTextArea class="h-min" />
      <StyledButton>Send</StyledButton>
    </div>
  </div>
</template>
