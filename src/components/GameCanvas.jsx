import { useEffect,  useRef } from "react"
import { Application } from "pixi.js"
import { renderTileMap, renderPlayer } from "../game/TileMapRenderer.js"
import { maps } from "../game/maps/index.js"
import { usePlayerMovement } from "../hooks/usePlayerMovement.js"

export default function GameCanvas({ mapId, onEnemyContact, onExit }) {
  const canvasRef = useRef(null)
  const appRef = useRef(null)
  const playerSpriteRef = useRef(null)

  const map = maps[mapId]
  const position = usePlayerMovement(map, onEnemyContact, onExit)

  useEffect(() => {
    const app = new Application()
    let destroyed = false
    let initialized = false

    async function setup() {
      await app.init({ background: '#1a1a1a', resizeTo: canvasRef.current })

      if (destroyed) {
        app.destroy(true, { children: true })
        return
      }

      initialized = true
      canvasRef.current.appendChild(app.canvas)
      
      const tileMapContainer = renderTileMap(map)
      app.stage.addChild(tileMapContainer)

      const playerSprite = renderPlayer(position)
      playerSpriteRef.current = playerSprite
      app.stage.addChild(playerSprite)
    }

    setup()

    return () => {
      destroyed = true
      if (initialized) {
        app.destroy(true, { children: true })
      }
    }
  }, [mapId])

  useEffect(()  => {
    if (playerSpriteRef.current) {
      playerSpriteRef.current.x = position.x * 32
      playerSpriteRef.current.y = position.y  * 32
    }
  }, [position])

  return <div ref={canvasRef} style={{  width:'100%', height: '600px' }}/>
}