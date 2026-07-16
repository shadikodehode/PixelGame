import { TileTypes } from "./tileTypes.js"

function getFloorTiles(map, exclude = []) {
  const tiles = []
  map.grid.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile ===TileTypes.FLOOR) tiles.push({ x, y })
    })
  })
  return tiles.filter(t =>
    !(t.x === map.entryPoint.x && t.y === map.entryPoint.y) &&
    !exclude.some(e => e.x === t.x && e.y === t.y)
  )
}

function pickRandom(tiles, count) {
  const shuffled = [...tiles].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function generateChests(map, count) {
  const tiles = getFloorTiles(map)
  return pickRandom(tiles, count).map((pos, i) => ({
    id: `${map.id}_chest_${i}`,
    type: "chest",
    ...pos,
  }))
}

export function generateEnemies(map, pool, count) {
  const tiles = getFloorTiles(map)
  return  pickRandom(tiles, count).map((pos, i) => ({
    id: `${map.id}_enemy_${i}`,
    type: pool[Math.floor(Math.random() * pool.length)],
    ...pos,
  }))
}