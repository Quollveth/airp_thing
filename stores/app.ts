import type { World, Stat, Entity, Agent, Endpoint } from "./types";
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
    rpModel: {
      Endpoint: {
        modelName: "",
        endpoint: "",
        token: "",
      },
      SystemPrompts: [],
    } as Agent,

    logicModel: {
      Endpoint: {
        modelName: "",
        endpoint: "",
        token: "",
      },
      SystemPrompts: [],
    } as Agent,

    rpUpdated: false,
    logicUpdated: false,
  }),

  actions: {
    reset(which: "logic" | "rp") {
      const empty = {
        Endpoint: {
          modelName: "",
          endpoint: "",
          token: "",
        },
        SystemPrompts: [],
      } as Agent;

      if (which == "logic") {
        this.logicModel = empty;
        this.logicUpdated = false;
      }
      if (which == "rp") {
        this.rpModel = empty;
        this.rpUpdated = false;
      }
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
