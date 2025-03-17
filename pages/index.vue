<script setup lang="ts">
import NiceButton from "@/components/styledButton.vue";

const APPNAME = "AIRP Thingmabob";
</script>
<template>
  <div>
    <h1>{{ APPNAME }}</h1>
    <NiceButton text="New Game" :onPress="() => console.log('hi')" />
  </div>
</template>
