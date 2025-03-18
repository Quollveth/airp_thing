<script setup lang="ts">
import type { Stat } from "@/stores/types";
import StyledInput from "@/components/styled/input.vue";

import Collapsable from "@/components/collapsable.vue";

import { useAppStore } from "@/stores/app";

const store = useAppStore();

const stats = ref<Stat[]>([]);
const addNew = () => {
  stats.value.push({
    name: "",
    description: "",
    min: 0,
    max: 0,
    thresholds: [],
  });
};
const newThresh = (index: number) => {
  stats.value[index].thresholds.push({
    value: 0,
    description: "",
  });
};

const _stinputs = {
  name: "string",
  description: "description",
  min: "min",
  max: "max",
} as const;
type StatInputs = keyof typeof _stinputs;

const EditStat = (e: Event, index: number, stat: StatInputs) => {
  const value = (e.target as HTMLInputElement).value as string;
  switch (stat) {
    case "name":
      stats.value[index].name = value;
      break;
    case "description":
      stats.value[index].description = value;
      break;
    case "min":
      stats.value[index].min = Number(value);
      break;
    case "max":
      stats.value[index].max = Number(value);
      break;
  }

  store.patchStat(stats.value[index].name, stats.value[index]);
};

const EditThresh = (
  e: Event,
  statIndex: number,
  thIndex: number,
  what: "value" | "description",
) => {
  const value = (e.target as HTMLInputElement).value as string;

  if (what === "value") {
    stats.value[statIndex].thresholds[thIndex].value = Number(value);
  } else {
    stats.value[statIndex].thresholds[thIndex].description = value;
  }

  store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
};
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-4xl font-extrabold text-gray-200 mb-6">Player Stats</h1>

    <div class="flex items-center self-end text-zinc-400 space-x-2 mb-4">
      <h3 class="text-lg">Add</h3>
      <button
        @click="addNew"
        class="p-1 rounded-full border border-zinc-700 shadow-lg"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6V18"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 12H18"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="w-full max-w-xl">
      <Collapsable
        v-for="(item, index) in stats"
        :key="index"
        :label="item.name"
        class="mb-4"
      >
        <div class="flex flex-col p-4">
          <label :for="'statName' + index" class="text-gray-300 font-semibold"
            >Name</label
          >
          <StyledInput
            type="text"
            :id="'statName' + index"
            v-model="item.name"
            @input="(e: Event) => EditStat(e, index, 'name')"
          />

          <label :for="'statDesc' + index" class="text-gray-300 font-semibold"
            >Description</label
          >
          <StyledInput
            type="text"
            :id="'statDesc' + index"
            v-model="item.description"
            @input="(e: Event) => EditStat(e, index, 'description')"
          />

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                :for="'statMin' + index"
                class="text-gray-300 font-semibold"
                >Min</label
              >
              <StyledInput
                type="number"
                :id="'statMin' + index"
                v-model.number="item.min"
                @input="(e: Event) => EditStat(e, index, 'min')"
              />
            </div>
            <div>
              <label
                :for="'statMax' + index"
                class="text-gray-300 font-semibold"
                >Max</label
              >
              <StyledInput
                type="number"
                :id="'statMax' + index"
                v-model.number="item.max"
                @input="(e: Event) => EditStat(e, index, 'max')"
              />
            </div>
          </div>

          <Collapsable label="Thresholds" class="mt-4">
            <div class="flex flex-col gap-4">
              <div class="self-end">
                <button
                  @click="() => newThresh(index)"
                  class="p-2 rounded-full border border-zinc-700"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V18"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 12H18"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-for="(th, th_index) in item.thresholds"
                class="grid grid-cols-2 gap-4"
              >
                <StyledInput
                  type="number"
                  v-model.number="th.value"
                  @input="(e: Event) => EditThresh(e, index, th_index, 'value')"
                />
                <StyledInput
                  type="text"
                  v-model="th.description"
                  @input="
                    (e: Event) => EditThresh(e, index, th_index, 'description')
                  "
                />
              </div>
            </div>
          </Collapsable>
        </div>
      </Collapsable>
    </div>
  </div>
</template>
