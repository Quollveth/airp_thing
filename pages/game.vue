<script setup lang="ts">
import type { World, Agent } from "@/stores/types";
import type { GameData } from "@/logic/model";

import { PromptNextState, StartGame } from "@/logic/model";
import Swal from "sweetalert2";

import {
  DEFAULT_HIST_SIZE,
  StepBack,
  StepForward,
  ChangeHistorySize,
} from "@/logic/model";

import { useWorldStore, useSettingsStore } from "@/stores/app";

import StyledTextArea from "@/components/styled/textField.vue";
import StyledButton from "@/components/styled/button.vue";
import Drawer from "@/components/drawer.vue";
import StatRender from "@/game_components/statRender.vue";

definePageMeta({
  middleware: (to, from) => {
    if (from.path == "/newgame") {
      return;
    }
    return navigateTo("/newgame");
  },
});

// Stores
const worldStore = useWorldStore();
const settingsStore = useSettingsStore();

// Constants
const worldOpts = ref<World>();
const rpAgent = ref<Agent>();
const logicAgent = ref<Agent>();

// Variable State
const gameState = ref<GameData>({
  action: "",
  situation: "",
  stats: [],
  visibleEntities: [],
});
const histSize = ref(DEFAULT_HIST_SIZE);

// World drawer
const expandEntityList = ref(true);
const expandDebug = ref(false);

//
//
//

// Initialize
onMounted(async () => {
  if (worldStore.worldEmpty) {
    alert("No world loaded");
    return navigateTo("/newgame");
  }

  if (
    !settingsStore.rpUpdated &&
    (settingsStore.sameModel || !settingsStore.logicUpdated)
  ) {
    alert("settings are default, default settings do not have an api key");
    return navigateTo("/newgame");
  }

  worldOpts.value = worldStore.worldOpts;
  rpAgent.value = settingsStore.rpModel;

  if (settingsStore.sameModel) {
    logicAgent.value = rpAgent.value;
  } else {
    logicAgent.value = settingsStore.logicModel;
  }

  gameState.value.visibleEntities = [];
  gameState.value.stats = worldStore.worldOpts.stats;

  inputLocked.value = true;
  const newState = await StartGame(
    gameState.value,
    worldOpts.value!,
    rpAgent.value!,
    logicAgent.value!,
    (text: string) => {
      gameState.value.situation += text;
    },
  );
  gameState.value = newState;
  gameState.value.action = "";
  inputLocked.value = false;
});

type debugAction = "revert" | "step" | "history_size";
const doDebugAction = (e: Event, which: debugAction) => {
  switch (which) {
    case "revert":
      StepBack();
      break;
    case "step":
      StepForward();
      break;
    case "history_size":
      const value = (e.target! as HTMLInputElement).value;
      ChangeHistorySize(Number(value));
  }
};

const inputLocked = ref(false);
const nextState = async () => {
  inputLocked.value = true;

  const statePreWipe = gameState.value;
  gameState.value.situation = "";
  gameState.value.action = "";

  const newState = await PromptNextState(
    statePreWipe,
    worldOpts.value!,
    rpAgent.value!,
    logicAgent.value!,
    (text) => {
      gameState.value.situation += text;
    },
  );
  gameState.value = newState;

  inputLocked.value = false;
};
</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center p-6 gap-4 z-1">
    <div class="flex justify-between w-full">
      <Drawer label="World">
        <div
          v-if="gameState.visibleEntities.length > 0"
          class="mx-4 text-zinc-300 overflow-y-auto"
        >
          <button
            @click="expandEntityList = !expandEntityList"
            class="flex items-center space-x-2 text-lg font-semibold"
          >
            <h2>Entities in Scene</h2>
          </button>

          <div
            v-if="expandEntityList"
            class="flex flex-col border-2 border-zinc-600 p-4 gap-4 bg-zinc-800 text-gray-300 rounded-lg shadow-md"
          >
            <div
              v-for="entity in gameState.visibleEntities"
              :key="entity.name"
              class="p-3 bg-zinc-800 rounded-lg"
            >
              <p class="text-lg">{{ entity.name }}</p>
              <p class="text-sm text-gray-400">{{ entity.description }}</p>
            </div>
          </div>
        </div>
        <div class="flex-grow" />
        <div class="max-h-60 m-4">
          <div
            v-if="expandDebug"
            class="flex flex-col border-2 border-zinc-600 p-4 gap-4 bg-zinc-800 text-gray-300 rounded-lg shadow-md"
          >
            <div class="flex gap-4">
              <StyledButton @click="(e) => doDebugAction(e, 'revert')"
                >Revert</StyledButton
              >
              <StyledButton @click="(e) => doDebugAction(e, 'step')"
                >Step</StyledButton
              >
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-semibold">Max History:</label>
              <input
                @change="(e) => doDebugAction(e, 'history_size')"
                type="number"
                :value="histSize"
                class="mt-1 p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            @click="expandDebug = !expandDebug"
            class="flex items-center space-x-2 text-lg font-semibold"
          >
            <h2>Debug</h2>
          </button>
        </div>
      </Drawer>
      <h1 class="font-extrabold text-lg">
        {{ worldOpts?.title ?? "Untitled World" }}
      </h1>
      <Drawer label="Stats" right>
        <div v-if="gameState.stats !== undefined" class="overflow-y-auto">
          <StatRender v-for="stat in gameState.stats" :stat="stat" />
        </div>
      </Drawer>
    </div>

    <StyledTextArea
      :readonly="inputLocked"
      v-model="gameState.situation"
      class="flex-1"
    />
    <div class="flex gap-2 w-full">
      <StyledTextArea
        :readonly="inputLocked"
        v-model="gameState.action"
        class="h-min"
      />
      <StyledButton @click="nextState">Send</StyledButton>
    </div>
  </div>
</template>
