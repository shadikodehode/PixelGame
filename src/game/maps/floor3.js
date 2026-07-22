import { F, W, E } from "../mapHelpers.js"

export const floor3 = {
  id: "floor3",
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
    { x: 0,  y: 4, targetMap: "floor2", entryPoint: {  x: 6,  y: 4 } },
    { x: 7,  y: 4, targetMap: "floor4", entryPoint: {  x: 6,  y: 4 } },
  ],
    enemySpawns: { pool: ["snek", "gator"], count: 3},
    chestCount: 1,
    lootPool: ["greaterHealthPotion", "sewerPipe", "rustedPlating"],
    boss: { id: "floor3_boss", x: 5, y: 2, type: "donatello" },
}