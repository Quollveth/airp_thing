<script setup lang="ts">
import StyledInput from "@/components/styled/input.vue";
import StyledButton from "@/components/styled/button.vue";
import Hint from "@/components/hintIcon.vue";
import type { Endpoint } from "@/stores/types";

import { useSettingsStore } from "@/stores/app";

const store = useSettingsStore();

const sameModel = ref(false);
const logicModel = ref<Endpoint>({
  endpoint: "",
  modelName: "",
  token: "",
});
const rpModel = ref<Endpoint>({
  endpoint: "",
  modelName: "",
  token: "",
});

onMounted(() => {
  sameModel.value = store.sameModel;
  logicModel.value = { ...store.logicModel.Endpoint };
  rpModel.value = { ...store.rpModel.Endpoint };
});

const useSame = (e: Event) => {
  const value = (e.target as HTMLInputElement).checked;

  sameModel.value = value;
  store.useSameModel(value);
};

type endpointInput = "end" | "name" | "key";
const updateSetting = (e: Event, logic: boolean, input: endpointInput) => {
  const value = (e.target as HTMLInputElement).value;
  const model = logic ? logicModel : rpModel;

  switch (input) {
    case "end":
      model.value!.endpoint = value;
      break;
    case "name":
      model.value!.modelName = value;
      break;
    case "key":
      model.value!.token = value;
      break;
  }

  store.patchEndpoint(logic ? "logic" : "rp", model.value as Endpoint);
};

const copySettings = (ntl: boolean) => {
  if (ntl) {
    logicModel.value = { ...rpModel.value };
    return;
  }
  rpModel.value = { ...logicModel.value };
};

const resetSettings = (e: Event) => {
  store.reset("logic");
  store.reset("rp");

  sameModel.value = store.sameModel;
  logicModel.value = { ...store.logicModel.Endpoint };
  rpModel.value = { ...store.rpModel.Endpoint };
};
</script>

<template>
  <div class="text-white flex flex-col items-center">
    <div class="flex gap-2">
      <h1 class="text-3xl font-bold mb-6">Endpoint Settings</h1>
      <StyledButton class="h-min" @click="resetSettings">Reset</StyledButton>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <div class="flex">
        <Hint
          text="The model responsible for the game narration and roleplay"
        />
        <h2 class="text-xl font-bold">Narration Model</h2>
      </div>

      <StyledInput
        @input="(e: Event) => updateSetting(e, false, 'end')"
        type="text"
        placeholder="Endpoint"
        :value="rpModel!.endpoint"
      />
      <StyledInput
        @input="(e: Event) => updateSetting(e, false, 'name')"
        type="text"
        placeholder="Model name"
        :value="rpModel!.modelName"
      />
      <StyledInput
        @input="(e: Event) => updateSetting(e, false, 'key')"
        type="text"
        placeholder="API key"
        :value="rpModel!.token"
      />
    </div>

    <div class="my-5 self-start gap-5 flex">
      <label>Use same model for narration and logic</label>
      <input type="checkbox" @input="useSame" :checked="sameModel" />

      <button @click="copySettings(false)" v-if="!sameModel">
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 5L6 11M12 5L18 11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        @click="copySettings(true)"
        class="transform rotate-180"
        v-if="!sameModel"
      >
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 5L6 11M12 5L18 11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-col gap-2 w-full" v-if="!sameModel">
      <div class="flex">
        <Hint
          text="The model responsible for the game logic, needs to be capable of outputting proper JSON"
        />
        <h2 class="text-xl font-bold">Logic Model</h2>
      </div>

      <StyledInput
        @input="(e: Event) => updateSetting(e, true, 'end')"
        type="text"
        placeholder="Endpoint"
        :value="logicModel!.endpoint"
      />
      <StyledInput
        @input="(e: Event) => updateSetting(e, true, 'name')"
        type="text"
        placeholder="Model name"
        :value="logicModel!.modelName"
      />
      <StyledInput
        @input="(e: Event) => updateSetting(e, true, 'key')"
        type="text"
        placeholder="API key"
        :value="logicModel!.token"
      />
    </div>
  </div>
</template>
