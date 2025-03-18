import type { World, Stat, Entity } from "./types";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    world: {
      stats: [],
      entities: [],
      player: "",
      world: "",
    } as World,
  }),
  actions: {},
});
