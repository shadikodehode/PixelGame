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

function makeRng(seedString) {
  let seed = 2166136261
  for (let i = 0; i < seedString.length; i++) {
    seed ^= seedString.charCodeAt(i)
    seed = Math.imul(seed, 16777619)
  }
  return () => {
    seed += 0x6D2B79F5
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickRandom(tiles, count, rng) {
  const output = [...tiles]
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const temp = output[i]
    output[i] = output[j]
    output[j] = temp
  }
  return output.slice(0, Math.min(count, output.length))
}

export function generateFloorEntities(map, seed) {
  const bossTile = map.boss ? [{ x: map.boss.x, y: map.boss.y }] : []
  const rng = makeRng(seed)

  const chestTiles = pickRandom(getFloorTiles(map, bossTile), map.chestCount, rng)
  const chests = chestTiles.map((pos, i) => ({
    id: `${map.id}_chest_${i}`,
    type: "chest",
    ...pos,
  }))

  const enemyTiles = pickRandom(getFloorTiles(map, [...bossTile, ...chestTiles]), map.enemySpawns.count, rng)
  const enemies = enemyTiles.map((pos, i) => ({
    id: `${map.id}_enemy_${i}`,
    type: map.enemySpawns.pool[Math.floor(rng() * map.enemySpawns.pool.length)],
    ...pos,
  }))

  return { chests, enemies }
}