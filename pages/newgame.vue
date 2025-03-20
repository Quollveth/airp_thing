<script setup lang="ts">
import Swal from "sweetalert2";
import WorldBlock from "@/components/styled/worldBlock.vue";
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const showWorldInfo = () => {
  const world = store.worldOpts;
  let cwstring: string;

  if (world.CW.length == 0) {
    cwstring = "CW list not provided";
  } else {
    cwstring = `CW: ${world.CW.join(",")}`;
  }

  Swal.fire({
    theme: "dark",
    title: world.title ?? "Untitled",
    text: world.description ?? "No description provided",
    footer: cwstring,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Load",
    reverseButtons: true,
  });
};

const uploadFile = async () => {
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
        store.reset();
        store.patch(jason);

        showWorldInfo();
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

const goBack = () => navigateTo("/");
</script>

<template>
  <div class="text-white flex flex-col items-center my-6 gap-8">
    <div class="flex gap-6">
      <h1 class="text-3xl font-bold mb-6">Choose a World</h1>
      <button
        class="px-4 h-10 rounded-lg transition duration-300 hover:bg-zinc-600 border-2 border-zinc-700"
        @click="goBack"
      >
        Back
      </button>
    </div>

    <WorldBlock :onClick="showWorldInfo" v-if="!store.worldEmpty">
      <h2 class="font-bold text-xl">Current</h2>
      <p>{{ store.worldOpts.title ?? "Untitled" }}</p>
    </WorldBlock>

    <WorldBlock :onClick="uploadFile" class="border-dashed">
      <div class="flex flex-col items-center gap-4">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h2>Upload World</h2>
      </div>
    </WorldBlock>
  </div>
</template>
