import { TileTypes } from "./tileTypes.js"

function getFloorTiles(map, exclude = []) {
  const tiles = []
  map.grid.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === TileTypes.FLOOR) tiles.push({ x, y })
    })
  })

  const blocked = new Set(exclude.map((tile) => `${tile.x},${tile.y}`))

  return tiles.filter((tile) => {
    const isEntry = tile.x === map.entryPoint.x && tile.y === map.entryPoint.y
    return !isEntry && !blocked.has(`${tile.x},${tile.y}`)
  })
}

function pickRandom(tiles, count) {
  const shuffled = [...tiles].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function generateFloorEntities(map) {
  const bossTile = map.boss ? [{ x: map.boss.x, y: map.boss.y }] : []

  const chestTiles = pickRandom(getFloorTiles(map, bossTile), map.chestCount)
  const chests = chestTiles.map((pos, i) => ({
    id: `${map.id}_chest_${i}`,
    type: "chest",
    ...pos,
  }))

  const enemyTiles = pickRandom(getFloorTiles(map, [...bossTile, ...chestTiles]), map.enemySpawns.count)
  const enemies = enemyTiles.map((pos, i) => ({
    id: `${map.id}_enemy_${i}`,
    type: map.enemySpawns.pool[Math.floor(Math.random() * map.enemySpawns.pool.length)],
    ...pos,
  }))

  return { chests, enemies }
}