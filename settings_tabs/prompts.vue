<script setup lang="ts">
import StyledTextArea from "@/components/styled/textField.vue";
import Collapsable from "@/components/collapsable.vue";

import { useSettingsStore } from "@/stores/app";

const store = useSettingsStore();

const rpModelPrompts = ref<string[]>([]);
const logicModelPrompts = ref<string[]>([]);

onMounted(() => {
  rpModelPrompts.value = [...store.rpModel.SystemPrompts];
  logicModelPrompts.value = [...store.logicModel.SystemPrompts];
});

const updatePrompt = (e: Event, which: "logic" | "rp", index: number) => {
  const value = (e.target as HTMLTextAreaElement).value;
  if (which == "logic") {
    logicModelPrompts.value[index] = value;
    store.patchModel("logic", { SystemPrompts: logicModelPrompts.value });
  }
  if (which == "rp") {
    rpModelPrompts.value[index] = value;
    store.patchModel("rp", { SystemPrompts: rpModelPrompts.value });
  }
};
</script>
<template>
  <div class="text-white flex flex-col items-center gap-6">
    <h1 class="text-3xl font-bold mb-6">Prompts Settings</h1>
    <p>
      These prompts are sent to the model as the system prompts in each
      request.<br />
      Data about the current state of the world can be included as parser calls
      in the format $[REFERENCE] <br /><br />Available references are:<br />
      $[WORLD] $[CONTENT] $[PLAYER] <br />
      $[LOCATION] $[ACTION] $[STATE] $[ENTITIES] <br />
      $[STATSSIMPLE] $[STATSFULL]<br />
    </p>
    <Collapsable label="Narration Model Prompts">
      <StyledTextArea
        rows="5"
        v-for="i in 5"
        :v-model="rpModelPrompts[i - 1]"
        @input="(e: Event) => updatePrompt(e, 'rp', i - 1)"
      />
    </Collapsable>
    <Collapsable label="Logic Model Prompts">
      <StyledTextArea
        rows="5"
        v-for="i in 5"
        v-model="logicModelPrompts[i - 1]"
        @input="(e: Event) => updatePrompt(e, 'logic', i - 1)"
      />
    </Collapsable>
  </div>
</template>
