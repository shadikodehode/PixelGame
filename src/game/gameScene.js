import { renderTileMap, renderPlayer, renderEnemy, renderChest } from "./TileMapRenderer.js"

export function buildScene(stage, map, position, defeatedEnemies = [], openedChests = []) {
  const tileMapContainer = renderTileMap(map)
  stage.addChild(tileMapContainer)

  map.enemies
  .filter(e => !defeatedEnemies.includes(e.id))
  .forEach(e => stage.addChild(renderEnemy(e)))

  map.objects
  .filter(o => o.type === "chest" && !openedChests.includes(o.id))
  .forEach(o => stage.addChild(renderChest(o)))

  const playerSprite = renderPlayer(position)
  stage.addChild(playerSprite)

  return { playerSprite }
}