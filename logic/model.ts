import type { World, Agent, Entity, Stat } from "@/stores/types";
import { ReplaceReferences } from "@/logic/parser";

import type { LogicResponse } from "@/logic/network";
import { Chat, AskLogic } from "@/logic/network";
import Swal from "sweetalert2";

export const DEFAULT_HIST_SIZE = 20;

export type Message = { role: string; content: string };
const History = new (class {
  history = [] as Message[];
  historySize = DEFAULT_HIST_SIZE;

  clearHistory() {
    this.history = [];
  }

  setHistorySize(size: number) {
    this.historySize = size;
  }

  addToHistory(entry: Message) {
    if (this.history.length > this.historySize) {
      this.history.shift();
    }
    this.history.push(entry);
  }

  removeLastN(n: number) {
    this.history.splice(n);
  }
})();

export function ChangeHistorySize(size: number) {
  History.setHistorySize(size);
}
export async function StartGame(
  gameState: GameData,
  worldData: World,
  narrationModel: Agent,
  logicModel: Agent,
  textCallback: (output: string) => void,
): Promise<GameData> {
  History.clearHistory();
  const withStartingAction = { ...gameState, action: "START GAME" };
  return PromptNextState(
    withStartingAction,
    worldData,
    narrationModel,
    logicModel,
    textCallback,
  );
}
export function StepBack() {}
export function StepForward() {}

export type GameData = {
  stats: Stat[];
  visibleEntities: Entity[];
  situation: string;
  action: string;
};

export async function PromptNextState(
  gameState: GameData,
  worldData: World,
  narrationModel: Agent,
  logicModel: Agent,

  textCallback: (output: string) => void,
): Promise<GameData> {
  const newState: GameData = { ...gameState };

  const logicPrompts = logicModel.SystemPrompts.map((p) =>
    ReplaceReferences(p, worldData, gameState.action, gameState.situation),
  );
  const narrationPrompts = narrationModel.SystemPrompts.map((p) =>
    ReplaceReferences(p, worldData, gameState.action, gameState.situation),
  );

  const modelNarration = {
    Endpoint: narrationModel.Endpoint,
    SystemPrompts: narrationPrompts,
  } as Agent;
  const modelLogic = {
    Endpoint: logicModel.Endpoint,
    SystemPrompts: logicPrompts,
  } as Agent;

  History.addToHistory({
    role: "player",
    content: gameState.action,
  });

  const newSituation = await Chat(
    modelNarration,
    History.history,
    textCallback,
  );

  newState.situation = newSituation;
  History.addToHistory({
    role: "narrator",
    content: newSituation,
  });

  try {
    const newData: LogicResponse = await AskLogic(modelLogic);

    Object.entries(newData.stats).forEach(([statName, change]) => {
      const stat = newState.stats.find((s) => s.name === statName);
      if (stat) {
        stat.current = Math.min(
          Math.max(stat.current + change, stat.min),
          stat.max,
        );
      }
    });

    newState.visibleEntities = newData.entities
      .map((entityName) =>
        worldData.entities.find((e) => e.name === entityName),
      )
      .filter((e): e is Entity => e !== undefined);

    return newState;
  } catch {
    Swal.fire({
      title: "The model failed to produce correct JSON",
      theme: "dark",
      icon: "error",
      toast: true,
      position: "top-end",
      timer: 1000,
    });
    return newState;
  }
}
