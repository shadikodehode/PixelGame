import { useEffect,  useRef } from "react"
import { Application } from "pixi.js"
import { renderTileMap } from "../game/TileMapRenderer.js"
import { maps } from "../game/maps/index.js"

export default function GameCanvas({ mapId }) {
  const canvasRef = useRef(null)

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
      const map = maps[mapId]
      const tileMapContainer = renderTileMap(map)
      app.stage.addChild(tileMapContainer)
    }

    setup()

    return () => {
      destroyed = true
      if (initialized) {
        app.destroy(true, { children: true })
      }
    }
  }, [mapId])

  return <div ref={canvasRef} style={{  width:'100%', height: '600px' }}/>
}