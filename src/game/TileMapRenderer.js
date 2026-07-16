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
  return renderEntity(position, 0xffcc00)
}

export function renderEnemy(enemy) {
  return renderEntity(enemy, 0xff3333)
}

export function renderChest(chest) {
  return renderEntity(chest, 0xd4af37)
}

export function renderEntity(pos, color) {
  const square = new Graphics()
  square.rect(0, 0, TILE_SIZE, TILE_SIZE)
  square.fill(color)
  square.x = pos.x * TILE_SIZE
  square.y = pos.y * TILE_SIZE
  return square
}