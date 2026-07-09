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
    { id: "goblin_1", x: 4, y: 2, type: "goblin" },
  ],
  objects: [
    { id: "chest_1", x: 5, y: 3, type: "chest" }
  ],
  exits: [
    {  x: 7,  y: 4, targetMap: "floor2", entryPoint: {  x:1,  y:  1 }},
  ],
}