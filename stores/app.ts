import type { World, Stat, Entity, Agent, Endpoint } from "./types";
import { DefaultModelRP, DefaultModelLogic } from "./defaults";
import { defineStore } from "pinia";

export const useWorldStore = defineStore("worldStore", {
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

export const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    logicModel: DefaultModelLogic,
    rpModel: DefaultModelRP,

    rpUpdated: false,
    logicUpdated: false,
    sameModel: false,
  }),

  actions: {
    reset(which: "logic" | "rp") {
      if (which == "logic") {
        this.logicModel = DefaultModelLogic;
        this.logicUpdated = false;
      }
      if (which == "rp") {
        this.rpModel = DefaultModelRP;
        this.rpUpdated = false;
      }
    },

    useSameModel(use: boolean) {
      this.sameModel = use;
    },

    patchModel(which: "logic" | "rp", update: Partial<Agent>) {
      if (which == "logic") {
        this.logicModel = { ...this.logicModel, ...update };
        this.logicUpdated = true;
      }
      if (which == "rp") {
        this.rpModel = { ...this.rpModel, ...update };
        this.rpUpdated = true;
      }
    },

    patchEndpoint(which: "logic" | "rp", update: Partial<Endpoint>) {
      if (which == "logic") {
        this.logicModel.Endpoint = { ...this.logicModel.Endpoint, ...update };
        this.logicUpdated = true;
      }
      if (which == "rp") {
        this.rpModel.Endpoint = { ...this.rpModel.Endpoint, ...update };
        this.rpUpdated = true;
      }
    },
  },
});
