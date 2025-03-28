import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { dataStore, action, state } from "./parser.test.ts";
import { DefaultModelLogic } from "@/stores/defaults.js";

import { AskLogic } from "../network.ts";
import { MODEL, ENDPOINT, TOKEN } from "./modelinfo.js";
import { ReplaceReferences } from "../parser.ts";

const logicPrompts = DefaultModelLogic.SystemPrompts.map((p) =>
  ReplaceReferences(p, dataStore, action, state),
);

const agent = {
  Endpoint: {
    endpoint: ENDPOINT,
    modelName: MODEL,
    token: TOKEN,
  },
  SystemPrompts: logicPrompts,
} as Agent;

Deno.test("tEsT nAmE cAnNoT bE eMpTy", async () => {
  await AskLogic(agent);
});
