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

export const DefaultModelLogic = {
  Endpoint: {
    modelName: "meta-llama/llama-3.3-70b-instruct:free",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    token: "YOUR API KEY HERE",
  },

  SystemPrompts: [
    // system 1: base prompt
    `You are the assistant of a game narration system.
	Given the current state of the game and the player's last action, decide how the player stats should be changed and which NPCs should be in the scene
	Respond in JSON with the stat changes and npcs in the scene, npcs not included must not be mentioned:
	\`\`\`json
	"stats":{
		"STAT NAME":VALUE,
		"STAT NAME":VALUE
	},
	npcs:[
		"NAME",
		"NAME",
		"NAME"
	]
	\`\`\``,
    // system 2: world
    `WORLD INFO: $[WORLD]
	LOCATION: $[LOCATION]`,
    // system 3: current state
    `CURRENT STATE: $[STATE]
	LAST PLAYER ACTION: $[ACTION]`,
    // system 4: player
    `PLAYER: $[PLAYER].
	Their current stats are $[STATSFULL]`,
    // system 5: npcs
    `NPCS: The following NPCs are available for the situation and any, or none, of them may be involved, NPCs may leave or enter the scene.
	$[ENTITIES]`,
  ],
} as Agent;
