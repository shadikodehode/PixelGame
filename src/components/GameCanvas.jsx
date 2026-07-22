import { useEffect,  useRef, useState } from "react"
import { usePixiApp } from "../pixi/usePixiApp.js"
import { buildScene } from "../game/gameScene.js"
import { maps } from "../game/maps/index.js"
import { usePlayerMovement } from "../hooks/usePlayerMovement.js"
import { useGameState } from "../context/GameStateContext.jsx"

export default function GameCanvas({ mapId, enemies, chests, onEnemyContact, onExit, onChestContact, onNpcContact, onBonfireContact }) {
  const canvasRef = useRef(null)
  const { appRef, ready } = usePixiApp(canvasRef)
  const [sceneRefs, setSceneRefs] = useState(null)
  const { gameState, updateGameState } = useGameState()

  const map = maps[mapId]
  const position = usePlayerMovement({
    map, enemies, chests, onEnemyContact, onExit, onChestContact, onNpcContact, onBonfireContact,
    initialPosition: gameState.playerPosition,
    openedChests: gameState.openedChests,
    defeatedEnemies: gameState.defeatedEnemies,
  })

  useEffect(() => {
    if (!ready || !appRef.current) return
    appRef.current.stage.removeChildren()
    const canvasSize = {
      width: appRef.current.screen.width,
      height: appRef.current.screen.height,
    }
    setSceneRefs(
      buildScene(appRef.current.stage, map, position, canvasSize, enemies, chests, gameState.defeatedEnemies, gameState.openedChests)
    )
  }, [ready, mapId, enemies, chests])

  useEffect(() => {
    if (sceneRefs) {
      sceneRefs.playerSprite.x = position.x * 32
      sceneRefs.playerSprite.y = position.y * 32
    }
    updateGameState({ playerPosition: position, currentMap: mapId })
  },  [position])

  return <div ref={canvasRef} style={{  width:'100%', height: '600px' }}/>
}