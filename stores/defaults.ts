import type { Agent, Endpoint } from "./types";

export const DefaultModelRP: Agent = {
  Endpoint: {
    modelName: "sophosympatheia/rogue-rose-103b-v0.2:free",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    token: "YOUR API KEY HERE",
  },
  SystemPrompts: [
    // system 1: base prompt
    `You are a game narrator. Given the information about the world and the player state create the next scenario for the player.
		Respond with a single short situation for the next state.
		Situations must be direct and involve a single action at most.
		Do not speak for, or act for the player. `,
    // system 2: world info
    `WORLD INFO: $[WORLD]
		This game involved the following content: $[CONTENT]`,
    // system 3: location
    `LOCATION INFO: $[LOCATION]`,
    // system 4: npcs
    `NPCS: The following NPCs are available for the situation and any, or none, of them may be involved.
		$[ENTITIES]`,
    // system 5: player
    `PLAYER: $[PLAYER].
		Their current stats are $[STATSSIMPLE]`,
  ],
};

const DefaultModelLogic = {
  Endpoint: {
    modelName: "meta-llama/llama-3.3-70b-instruct:free",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    token: "YOUR API KEY HERE",
  },

  StatsQuery: [
    // system 1: base prompt
    `You are the assistant of a game narration system.
		Given the current state of the game and the player's last action, decide how the player stats should be changed`,
    // system 2: world
    `WORLD INFO: $[WORLD]
	LOCATION: $[LOCATION]`,
    // system 3: current state
    `CURRENT STATE: $[STATE]
	LAST PLAYER ACTION: $[ACTION]`,
    // system 4: player
    `PLAYER: $[PLAYER].
		Their current stats are $[STATSFULL]`,
  ],

  NpcsQuery: [
    // system 1: base prompt
    `You are the assistant of a game narration system.
		Given the current state of the game determine which NPCs are included in the current situation.
		A NPC may have left or joined the scene from the previous state.`,
    // system 2: current state
    `CURRENT STATE: $[WORLD]`,
    // system 3: NPCs
    `NPCS: The following NPCs are available for the situation and any, or none, of them may be involved.
		$[ENTITIES]`,
  ],
};

type logicModelQueries = "stats" | "npcs";
export const getLogicModel = (which: logicModelQueries) => {
  return {
    Endpoint: DefaultModelLogic.Endpoint,
    SystemPrompts:
      which == "stats"
        ? DefaultModelLogic.StatsQuery
        : DefaultModelLogic.NpcsQuery,
  } as Agent;
};
