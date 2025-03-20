import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import type { World, Stat, Entity } from "../../stores/types.ts";
import {
  ReplaceReferences,
  formatEntity,
  formatStatSimple,
  formatStatFull,
} from "../parser.ts";

const dataStore: World = {
  title: "Test World",
  description: "Only for testing",
  CW: ["tests", "testing", "deno"],
  world: "on earth",
  location: "chicago",
  player: "some dude",
  entities: [
    {
      name: "human",
      description: "a person",
      tags: ["human", "alive"],
    },
    {
      name: "dog",
      description: "goes bork bork",
      tags: ["animal", "alive"],
    },
  ],
  stats: [
    {
      name: "health",
      description: "how alive are you",
      min: 0,
      max: 100,
      starting: 60,
      thresholds: [
        {
          value: 0,
          description: "ded",
        },
        {
          value: 50,
          description: "hurt",
        },
        {
          value: 100,
          description: "ok",
        },
      ],
      regens: [],
    },
  ],
} as const;

const action = "walk down the street";
const state = "the player is walking down the street";

type testUnit = {
  text: string;
  template: string;
  expected: string;
};

function performTest(unit: testUnit) {
  Deno.test(unit.text, () => {
    assertEquals(
      ReplaceReferences(unit.template, dataStore, action, state),
      unit.expected,
    );
  });
}

performTest({
  text: "world and location",
  template: "the game is set on $[WORLD], in $[LOCATION]",
  expected: `the game is set on ${dataStore.world}, in ${dataStore.location}`,
});

performTest({
  text: "npc list",
  template: `NPCS: The following NPCs are available for the situation and any, or none, of them may be involved.
		$[ENTITIES]`,
  expected: `NPCS: The following NPCs are available for the situation and any, or none, of them may be involved.
		${dataStore.entities.map(formatEntity).join("\n")}`,
});
