import { Graphics, Container } from "pixi.js"
import { TileColors, TILE_SIZE } from "./tileTypes.js"

export function renderTileMap(map) {
  const container  = new Container()

  map.grid.forEach((row, y) => {
    row.forEach((tileType, x) => {
      const square = new Graphics()
      square.rect(0, 0, TILE_SIZE, TILE_SIZE)
      square.fill(TileColors[tileType])
      square.x = x * TILE_SIZE
      square.y = y * TILE_SIZE
      container.addChild(square)
    })
  })

  return container
}

export function renderPlayer(position) {
  const player = new Graphics()
  player.rect(0, 0, TILE_SIZE, TILE_SIZE)
  player.fill(0xffcc00)
  player.x = position.x * TILE_SIZE
  player.y = position.y * TILE_SIZE
  return player
}