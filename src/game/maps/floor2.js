import { TileTypes } from "../tileTypes.js"

const F = TileTypes.FLOOR
const W  = TileTypes.WALL
const E = TileTypes.EXIT

export const floor2 = {
  id: "floor2",
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
    { id: "goblin_2", x: 4, y: 2, type: "goblin" },
  ],
  objects: [
    { id: "chest_2", x: 5, y: 3, type: "chest" }
  ],
  exits: [
    {  x: 0,  y: 4, targetMap: "floor1", entryPoint: {  x: 6,  y: 4 }},
  ],
}