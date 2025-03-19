<script setup lang="ts">
import type { Entity } from "@/stores/types";
import { useAppStore } from "@/stores/app";
import TextEditField from "@/components/editTextField.vue";

const store = useAppStore();

const entities = ref<Entity[]>([]);
const player = ref("");

onMounted(() => {
  entities.value = store.worldOpts.entities;
  player.value = store.worldOpts.player;
});

const addNew = () => {
  entities.value.push({
    name: "",
    description: "",
    tags: [],
  });
};
const removeEntity = (index: number) => {
  entities.value.splice(index, 1);
};

const editPlayer = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  player.value = value;
  store.patch({
    player: value,
  });
};

const _entinputs = {
  name: "string",
  description: "description",
  tags: "tags",
} as const;
type EntInputs = keyof typeof _entinputs;

const editEntity = (e: Event, index: number, what: EntInputs) => {
  const value = (e.target as HTMLTextAreaElement).value as string;
  if (what == "name") {
    entities.value[index].name = value;
  }
  if (what == "description") {
    entities.value[index].description = value;
  }
  if (what == "tags") {
    const tagsAsList = value.split(",");
    entities.value[index].tags = [...tagsAsList];
  }
  store.patchEntity(entities.value[index].name, entities.value[index]);
};
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-4xl font-extrabold text-gray-200 mb-6">Entities</h1>
    <TextEditField
      label="Player Description"
      hintText="Short description of the player's appearance"
      :changeHandler="editPlayer"
      :initialValue="player"
    />

    <h1 class="text-2xl font-bold text-gray-200 mb-6">NPCs</h1>
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

    <Collapsable
      v-for="(item, index) in entities"
      :key="index"
      :label="item.name"
      class="mb-4"
    >
      <div class="flex flex-col p-4 gap-2">
        <button
          @click="() => removeEntity(index)"
          class="self-end cursor-pointer"
        >
          <img src="@/assets/trash.svg" />
        </button>

        <TextEditField
          label="Name"
          noHint
          minRows="1"
          :changeHandler="(e: Event) => editEntity(e, index, 'name')"
          :initialValue="item.name"
        />
        <TextEditField
          label="Description"
          hintText="Short description of this npc for the model"
          :changeHandler="(e: Event) => editEntity(e, index, 'description')"
          :initialValue="item.description"
        />
        <TextEditField
          label="Tags (comma separated)"
          hintText="Additional information about this npc for the model"
          minRows="1"
          :changeHandler="(e: Event) => editEntity(e, index, 'tags')"
          :initialValue="item.tags.join(',')"
        />
      </div>
    </Collapsable>
  </div>
</template>
