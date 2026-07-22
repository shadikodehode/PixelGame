import { F, W, E } from "../mapHelpers.js"

export const floor1 = {
  id: "floor1",
  grid: [
    [W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, E],
    [W, W, W, W, W, W, W, W],
  ],
  entryPoint:{ x: 1, y: 1 },
  exits: [
    { x: 7,  y: 4, targetMap: "floor2", entryPoint: {  x: 1,  y: 4 }},
  ],
  enemySpawns: { pool: ["rat"], count: 1},
  chestCount: 1,
  lootPool: ["healthPotion", "rustySword", "leatherScraps"],
}