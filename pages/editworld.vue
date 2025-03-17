<script setup lang="ts">
import TabNavigation from "@/components/navbar.vue";

import worldtab from "@/edit_world_tabs/worldtab.vue";
import entitiestab from "@/edit_world_tabs/entitiestab.vue";
import statstab from "@/edit_world_tabs/statstab.vue";
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-grow" />
    <TabNavigation
      :pages="[
        {
          label: 'World',
          content: worldtab,
        },
        {
          label: 'Entities',
          content: entitiestab,
        },
        {
          label: 'Stats',
          content: statstab,
        },
      ]"
    />
  </div>
</template>
