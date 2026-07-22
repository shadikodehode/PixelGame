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
    { x: 7,  y: 4, targetMap: "floor5", entryPoint: {  x: 6,  y: 4 } },
  ],
  shopPool:["healthPotion", "greaterHealthPotion", "rustySword", "sewerPipe", "leatherScraps", "rustedPlating"]
}