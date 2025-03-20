<script setup lang="ts">
import TextEditField from "@/components/editTextField.vue";
import { useWorldStore } from "@/stores/app";

const store = useWorldStore();

const desc = ref("");
const title = ref("");
const cw = ref<string[]>([]);

onMounted(() => {
  desc.value = store.worldOpts.description;
  title.value = store.worldOpts.title;
  cw.value = store.worldOpts.CW;
});

const descHandler = (e: Event) => {
  desc.value = (e.target as HTMLTextAreaElement).value;
  store.patch({ description: desc.value });
};

const titleHandler = (e: Event) => {
  title.value = (e.target as HTMLTextAreaElement).value;
  store.patch({ title: title.value });
};

const cwHandler = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  const asList = value.split(",");
  cw.value = asList;
  store.patch({ CW: cw.value });
};
</script>

<template>
  <div class="text-white flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6">World Settings</h1>
    <TextEditField
      label="Title"
      :minRows="1"
      noHint
      :changeHandler="titleHandler"
      :initialValue="title"
    />
    <TextEditField
      label="Description"
      :minRows="2"
      :changeHandler="descHandler"
      hintText="A short description of this scenario, this will not be sent to the model"
      :initialValue="desc"
    />
    <TextEditField
      label="Content Warnings (comma separated)"
      :minRows="1"
      hintText="List of fetishes or other material that may be included. This list will be sent to the model"
      :changeHandler="cwHandler"
      :initialValue="cw.join(',')"
    />
  </div>
</template>
