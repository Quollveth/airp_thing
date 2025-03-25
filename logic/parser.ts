/* The AI prompts may include references to the game data, these need to be replaced with the actual data before being sent
 * All the references will be as $[REFERENCE]
 */

//import type { World, Stat, Entity } from "@/stores/types";
import type { World, Stat, Entity } from "../stores/types.ts";

export function formatStatSimple(stat: Stat): string {
  const lastThresh =
    stat.thresholds
      .filter((t) => t.value <= stat.current)
      .sort((a, b) => b.value - a.value)[0] || null;

  return `${stat.name}: ${stat.current}/${stat.max} - ${lastThresh}`;
}

export function formatStatFull(stat: Stat): string {
  const lastThresh =
    stat.thresholds
      .filter((t) => t.value <= stat.current)
      .sort((a, b) => b.value - a.value)[0] || null;

  return `${stat.name}: ${stat.description} - min:${stat.min}, max:${stat.max}, current:${stat.current} - ${lastThresh}`;
}

export function formatEntity(entity: Entity): string {
  return `${entity.name}: ${entity.description} - ${entity.tags.join(",")}`;
}

export function ReplaceReferences(
  toReplace: string,
  dataStore: World,
  action: string,
  state: string,
): string {
  const statGetter: Record<string, () => string> = {
    "$[WORLD]": () => dataStore.world,
    "$[CONTENT]": () => dataStore.CW.join(","),
    "$[PLAYER]": () => dataStore.player,
    "$[LOCATION]": () => dataStore.location,
    "$[ACTION]": () => action,
    "$[STATE]": () => state,
    "$[ENTITIES]": () => dataStore.entities.map(formatEntity).join("\n"),
    "$[STATSSIMPLE]": () => dataStore.stats.map(formatStatSimple).join("\n"),
    "$[STATSFULL]": () => dataStore.stats.map(formatStatFull).join("\n"),
  };

  return toReplace.replace(
    /\$\[[A-Z]+\]/g,
    (match) => statGetter[match]?.() ?? match,
  );
}
