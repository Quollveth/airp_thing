import type { World } from "./types";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    worldOpts: {
      stats: [],
      entities: [],
      player: "",
      world: "",
      location: "",
    } as World,
  }),

  actions: {},
});
