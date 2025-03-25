<script setup lang="ts">
import type { Stat, Comparison } from "@/stores/types";
import StyledInput from "@/components/styled/input.vue";
import Collapsable from "@/components/collapsable.vue";
import { useWorldStore } from "@/stores/app";

const store = useWorldStore();

const stats = ref<Stat[]>([]);

onMounted(() => {
  stats.value = store.worldOpts.stats;
});

const addNew = () => {
  stats.value.push({
    name: "",
    description: "",
    min: 0,
    max: 0,
    current: 0,
    thresholds: [],
    regens: [],
  });
};
const newThresh = (index: number) => {
  stats.value[index].thresholds.push({
    value: 0,
    description: "",
  });
};
const newRegen = (index: number) => {
  stats.value[index].regens.push({
    value: 0,
    condition: {
      stat: "Always",
      operation: "greater",
      value: 0,
    },
  });
};

const removeStat = (index: number) => {
  stats.value.splice(index, 1);
  store.patchStat(stats.value[index].name, stats.value[index]);
};
const removeTresh = (statIndex: number, thIndex: number) => {
  stats.value[statIndex].thresholds.splice(thIndex, 1);
  store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
};
const removeRegen = (statIndex: number, regIndex: number) => {
  stats.value[statIndex].regens.splice(regIndex, 1);
  store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
};

const _stinputs = {
  name: "string",
  description: "description",
  min: "min",
  max: "max",
  current: "starting",
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
    case "current":
      stats.value[index].current = Number(value);
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

const EditRegen = {
  value: (e: Event, statIndex: number, regIndex: number) => {
    const value = (e.target as HTMLInputElement).value as string;

    stats.value[statIndex].regens[regIndex].value = Number(value);
    store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
  },

  condVal: (e: Event, statIndex: number, regIndex: number) => {
    const value = (e.target as HTMLInputElement).value as string;

    stats.value[statIndex].regens[regIndex].condition.value = Number(value);
    store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
  },

  condStat: (e: Event, statIndex: number, regIndex: number) => {
    const value = (e.target as HTMLSelectElement).value as string;

    stats.value[statIndex].regens[regIndex].condition.stat = value;
    store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
  },

  condition: (e: Event, statIndex: number, regIndex: number) => {
    const value = (e.target as HTMLSelectElement).value as string;

    stats.value[statIndex].regens[regIndex].condition.operation =
      value as Comparison;
    store.patchStat(stats.value[statIndex].name, stats.value[statIndex]);
  },
} as const;
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
        <div class="flex flex-col p-4 gap-2">
          <button
            @click="() => removeStat(index)"
            class="self-end cursor-pointer"
          >
            <img src="@/assets/trash.svg" />
          </button>

          <label :for="'statName' + index" class="text-gray-300 font-semibold"
            >Name</label
          >
          <StyledInput
            type="text"
            :id="'statName' + index"
            :value="item.name"
            @input="(e: Event) => EditStat(e, index, 'name')"
          />

          <label :for="'statDesc' + index" class="text-gray-300 font-semibold"
            >Description</label
          >
          <StyledInput
            type="text"
            :id="'statDesc' + index"
            :value="item.description"
            @input="(e: Event) => EditStat(e, index, 'description')"
          />

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label
                :for="'statMin' + index"
                class="text-gray-300 font-semibold"
                :value="Number(item.max)"
                >Min</label
              >
              <StyledInput
                type="number"
                class="w-full"
                :id="'statMin' + index"
                :value="Number(item.min)"
                @input="(e: Event) => EditStat(e, index, 'min')"
              />
            </div>
            <div>
              <label
                :for="'statStart' + index"
                class="text-gray-300 font-semibold"
                >Starting</label
              >
              <StyledInput
                type="number"
                class="w-full"
                :id="'statStart' + index"
                :value="item.current"
                @input="(e: Event) => EditStat(e, index, 'current')"
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
                class="w-full"
                :id="'statMax' + index"
                :value="item.max"
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
              <div v-for="(th, th_index) in item.thresholds" class="flex gap-4">
                <div class="flex gap-4">
                  <StyledInput
                    type="number"
                    :value="Number(th.value)"
                    @input="
                      (e: Event) => EditThresh(e, index, th_index, 'value')
                    "
                  />
                  <StyledInput
                    type="text"
                    :value="th.description"
                    @input="
                      (e: Event) =>
                        EditThresh(e, index, th_index, 'description')
                    "
                  />
                </div>
                <button
                  @click="() => removeTresh(index, th_index)"
                  class="self-end cursor-pointer"
                >
                  <img src="@/assets/trash.svg" />
                </button>
              </div>
            </div>
          </Collapsable>

          <Collapsable label="Regens" class="mt-4">
            <div class="flex flex-col gap-4">
              <div class="self-end">
                <button
                  @click="() => newRegen(index)"
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
              <div v-for="(reg, reg_index) in item.regens" class="flex gap-4">
                <StyledInput
                  type="number"
                  class="w-20"
                  :value="reg.value"
                  @input="(e: Event) => EditRegen.value(e, index, reg_index)"
                />
                <p class="pt-2">when</p>
                <div class="flex gap-2 flex-grow w-full items-center">
                  <select
                    name="stat"
                    :value="reg.condition.stat"
                    @change="
                      (e: Event) => EditRegen.condStat(e, index, reg_index)
                    "
                  >
                    <option value="always">Always</option>
                    <option v-for="st in stats" :value="st.name">
                      {{ st.name }}
                    </option>
                  </select>
                  <select
                    :value="reg.condition.operation"
                    @change="
                      (e: Event) => EditRegen.condition(e, index, reg_index)
                    "
                  >
                    <option value="greater">Greater Than</option>
                    <option value="less">Less Than</option>
                    <option value="greater_equal">Greater or Equal</option>
                    <option value="less_equal">Less or Equal</option>
                  </select>
                  <StyledInput
                    class="w-20"
                    type="number"
                    :value="reg.condition.value"
                    @input="
                      (e: Event) => EditRegen.condVal(e, index, reg_index)
                    "
                  />
                  <button
                    @click="() => removeRegen(index, reg_index)"
                    class="self-end cursor-pointer"
                  >
                    <img src="@/assets/trash.svg" />
                  </button>
                </div>
              </div>
            </div>
          </Collapsable>
        </div>
      </Collapsable>
    </div>
  </div>
</template>
