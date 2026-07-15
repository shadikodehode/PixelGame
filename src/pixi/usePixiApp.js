import { useEffect, useRef } from "react"
import { Application } from "pixi.js"

export function usePixiApp(canvasRef) {
  const appRef = useRef(null)

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
      appRef.current = app
      canvasRef.current.appendChild(app.canvas)
    }

    setup()

    return () => {
      destroyed = true
      if (initialized) app.destroy(true, { children: true })
    }
  }, [canvasRef])

  return appRef
}