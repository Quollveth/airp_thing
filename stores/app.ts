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
      title: "",
      description: "",
      CW: [],
    } as World,

    worldEmpty: true,
  }),

  actions: {
    reset() {
      this.worldOpts = {
        stats: [] as Stat[],
        entities: [] as Entity[],
        player: "",
        world: "",
        location: "",
        title: "",
        description: "",
        CW: [],
      } as World;
      this.worldEmpty = true;
    },

    patch(update: Partial<World>) {
      this.worldOpts = { ...this.worldOpts, ...update };
      this.worldEmpty = false;
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
        this.worldEmpty = false;
      }
    },

    patchStat(statName: string, update: Partial<Stat>) {
      const index = this.worldOpts.stats.findIndex((s) => s.name === statName);
      if (index !== -1) {
        this.worldOpts.stats[index] = {
          ...this.worldOpts.stats[index],
          ...update,
        };
        this.worldEmpty = false;
      }
    },
  },
});
