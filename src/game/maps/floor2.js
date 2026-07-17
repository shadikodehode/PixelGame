import { F, W, E } from "../mapHelpers.js"

export const floor2 = {
  id: "floor2",
  grid: [
    [W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W],
    [E, F, F, F, F, F, F, E],
    [W, W, W, W, W, W, W, W],
  ],
  entryPoint:{ x: 1, y: 1 },
  exits: [
    { x: 0, y: 4, targetMap: "floor1", entryPoint: { x: 6, y: 4 } },
    { x: 7, y: 4, targetMap: "floor3", entryPoint: { x: 1, y: 4 } },
  ],
    enemySpawns: { pool: ["goblin"], count: 2},
    chestCount: 2,
}