import { F, W, E } from "../mapHelpers.js"

export const floor3 = {
  id: "floor3",
  grid: [
    [W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W],
    [E, F, F, F, F, F, F, W],
    [W, W, W, W, W, W, W, W],
  ],
  entryPoint:{ x: 1, y: 1 },
  exits: [
    { x: 0,  y: 4, targetMap: "floor2", entryPoint: {  x: 6,  y: 4 } },
  ],
    enemySpawns: { pool: ["goblin"], count: 1},
    chestCount: 1,
    boss: { id: "floor3_boss", x: 5, y: 2, type: "swampKing" },
}