<script setup lang="ts">
import NiceButton from "@/components/styledButton.vue";
import Credits from "@/components/credits.vue";

const APPNAME = "AIRP Thingmabob";
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="flex flex-grow" />
    <h1 class="text-4xl font-bold mb-8">{{ APPNAME }}</h1>
    <div class="space-y-4 flex flex-col">
      <NiceButton text="New Game" :onPress="() => navigateTo('/newgame')" />
      <NiceButton text="Load Game" :onPress="() => navigateTo('/loadgame')" />
      <NiceButton text="Edit World" :onPress="() => navigateTo('/editworld')" />
      <NiceButton text="Settings" :onPress="() => navigateTo('/settings')" />
    </div>
    <div class="flex flex-grow" />
    <div class="mt-20">
      <Credits />
    </div>
  </div>
</template>
