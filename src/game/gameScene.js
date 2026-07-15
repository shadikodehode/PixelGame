import { renderTileMap, renderPlayer } from "./TileMapRenderer.js"

export function buildScene(stage, map, position) {
  const tileMapContainer = renderTileMap(map)
  stage.addChild(tileMapContainer)

  const playerSprite = renderPlayer(position)
  stage.addChild(playerSprite)

  return { playerSprite }
}