import type { World, Stat, Entity } from "./types";
import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    worldOpts: {
      stats: [] as Stat[],
      entities: [] as Entity[],
      player: "",
      world: "",
      location: "",
      description: "",
      CW: [],
    } as World,
  }),

  actions: {
    patch(update: Partial<World>) {
      this.worldOpts = { ...this.worldOpts, ...update };
    },

    validate(toCheck: any) {
      // verify if it's a world, throw if not
      //TODO: this lmao
      return;
    },

    patchEntity(entityName: string, update: Partial<Entity>) {
      const index = this.worldOpts.entities.findIndex(
        (e) => e.name === entityName,
      );
      if (index !== -1) {
        this.worldOpts.entities[index] = {
          ...this.worldOpts.entities[index],
          ...update,
        };
      }
    },

    patchStat(statName: string, update: Partial<Stat>) {
      const index = this.worldOpts.stats.findIndex((s) => s.name === statName);
      if (index !== -1) {
        this.worldOpts.stats[index] = {
          ...this.worldOpts.stats[index],
          ...update,
        };
      }
    },
  },
});
