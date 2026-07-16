import { renderTileMap, renderPlayer, renderEnemy, renderChest } from "./TileMapRenderer.js"
import { Container } from "pixi.js"
import { TILE_SIZE } from "./tileTypes.js"

export function buildScene(stage, map, position, canvasSize, enemies, chests, defeatedEnemies = [], openedChests = []) {
  const sceneContainer = new Container()

  const tileMapContainer = renderTileMap(map)
  sceneContainer.addChild(tileMapContainer)

  enemies
  .filter(e => !defeatedEnemies.includes(e.id))
  .forEach(e => sceneContainer.addChild(renderEnemy(e)))

  chests
  .filter(o => o.type === "chest" && !openedChests.includes(o.id))
  .forEach(o => sceneContainer.addChild(renderChest(o)))

  const playerSprite = renderPlayer(position)
  sceneContainer.addChild(playerSprite)

  const mapWidthPx = map.grid[0].length * TILE_SIZE
  const mapHeightPx = map.grid.length * TILE_SIZE
  sceneContainer.x = (canvasSize.width - mapWidthPx) / 2
  sceneContainer.y = (canvasSize.height - mapHeightPx) /2

  stage.addChild(sceneContainer)

  return { playerSprite }
}