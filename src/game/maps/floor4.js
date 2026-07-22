import { F, W, E } from "../mapHelpers.js"

export const floor4 = {
  id: "floor4",
  type: "shop",
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
    { x: 0,  y: 4, targetMap: "floor3", entryPoint: {  x: 6,  y: 4 } },
    { x: 7,  y: 4, targetMap: "floor5", entryPoint: {  x: 6,  y: 4 } },
  ],
  npc: { id: "floor4_shopKeeper", x: 2, y: 2 },
  bonfire: { id: "floor4_bonfire", x: 5, y: 2 },
  restockFrom: ["floor1", "floor2", "floor3"],
}