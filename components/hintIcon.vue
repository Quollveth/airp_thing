<script setup lang="ts">
interface Props {
  text: string;
}
defineProps<Props>();
</script>

<template>
  <div id="popover__wrapper">
    <a class="cursor-pointer">
      <h2
        class="px-2 mx-1 rounded-full border border-zinc-700"
        id="popover__title"
      >
        ?
      </h2>
    </a>
    <div
      id="popover__content"
      class="bg-zinc-600 border border-zinc-800 rounded-lg p-2 text-sm shadow-md"
    >
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
#popover__title {
  text-decoration: none;
}
#popover__wrapper {
  position: relative;
  display: inline-block;
}
#popover__content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -250%;
  top: 100%;
  width: 200px;
}
#popover__content:before {
  position: absolute;
  z-index: -1;
  content: "";
  right: calc(50% - 10px);
  top: -8px;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent oklch(0.442 0.017 285.786) transparent;
  transition-duration: 0.3s;
  transition-property: transform;
}
#popover__wrapper:hover #popover__content {
  z-index: 10;
  opacity: 1;
  visibility: visible;
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}
</style>
