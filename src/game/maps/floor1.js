import { TileTypes } from "../tileTypes.js"

const F = TileTypes.FLOOR
const W  = TileTypes.WALL
const E = TileTypes.EXIT

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
  enemies: [
    { type: "goblin" },
  ],
  objects: [
    { type: "chest" }
  ],
  exits: [
    {  x: 7,  y: 4, targetMap: "floor2", entryPoint: {  x: 1,  y: 1 }},
  ],
}