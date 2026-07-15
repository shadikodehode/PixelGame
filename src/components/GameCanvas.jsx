import { useEffect,  useRef, useState } from "react"
import { usePixiApp } from "../pixi/usePixiApp.js"
import { buildScene } from "../game/gameScene.js"
import { maps } from "../game/maps/index.js"
import { usePlayerMovement } from "../hooks/usePlayerMovement.js"
import { useGameState } from "../context/GameStateContext.jsx"

export default function GameCanvas({ mapId, onEnemyContact, onExit }) {
  const canvasRef = useRef(null)
  const appRef = usePixiApp(canvasRef)
  const [sceneRefs, setSceneRefs] = useState(null)

  const { gameState, updateGameState } = useGameState()
  const map = maps[mapId]
  const position = usePlayerMovement(map, onEnemyContact, onExit, gameState.playerPosition)

  useEffect(() => {
    if (appRef.current && !sceneRefs) {
      setSceneRefs(buildScene(appRef.current.stage, map, position))
    }
  }, [appRef.current])

  useEffect(() => {
    if (sceneRefs) {
      sceneRefs.playerSprite.x = position.x * 32
      sceneRefs.playerSprite.y = position.y * 32
    }
    updateGameState({ playerPosition: position, currentMap: mapId })
  },  [position])

  return <div ref={canvasRef} style={{  width:'100%', height: '600px' }}/>
}