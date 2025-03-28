<script setup lang="ts">
import StyledButton from "@/components/styled/button.vue";
import Credits from "@/components/credits.vue";

const APPNAME = "AIRP Thingmabob";
</script>
<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="flex flex-grow" />
    <h1 class="text-4xl font-bold mb-8">{{ APPNAME }}</h1>
    <div class="space-y-4 flex flex-col">
      <StyledButton @click="() => navigateTo('/newgame')"
        >New Game</StyledButton
      >
      <!--
      <StyledButton @click="() => navigateTo('/loadgame')"
        >Load Game</StyledButton
      >
	  -->
      <StyledButton @click="() => navigateTo('/editworld')"
        >Edit World</StyledButton
      >
      <StyledButton @click="() => navigateTo('/settings')"
        >Settings</StyledButton
      >
    </div>
    <div class="flex flex-grow" />
    <div class="mt-20">
      <Credits />
    </div>
  </div>
</template>
