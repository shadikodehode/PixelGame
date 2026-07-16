import { useCallback, useEffect, useState } from "react"
import { TileTypes } from "../game/tileTypes.js"

export function usePlayerMovement(map, onEnemyContact, onExit, onChestContact, initialPosition, openedChests = []) {
  const [position, setPosition] = useState(initialPosition ?? map.entryPoint)
  const [pendingEvent, setPendingEvent] = useState(null)

  useEffect(() => {
    setPosition(initialPosition ?? map.entryPoint)
  }, [map.id])

  const tryMove = useCallback((dx, dy) => {
    setPosition((current) => {
      const next = { x: current.x + dx, y: current.y + dy }

      const row = map.grid[next.y]
      const tile = row?.[next.x]
      if (!tile || tile === TileTypes.WALL) return current

      const enemy = map.enemies.find(e => e.x === next.x && e.y === next.y)
      if (enemy) {
        setPendingEvent({ type: "enemy", data: enemy })
        return current
      }

      const chest = map.objects.find(
        o => o.type === "chest" && o.x === next.x && o.y === next.y && !openedChests.includes(o.id)
      )
      if (chest) {
        setPendingEvent({ type: "chest", data: chest })
        return next
      }
      
      const exit = map.exits.find(e => e.x === next.x && e.y === next.y)
      if (exit) {
        setPendingEvent({ type: "exit", data: exit })
        return current
      }

      return next
    })
  }, [map, openedChests])

  useEffect(() => {
    if (!pendingEvent) return
    if (pendingEvent.type === "enemy") onEnemyContact(pendingEvent.data)
    if (pendingEvent.type === "chest") onChestContact(pendingEvent.data)
    if (pendingEvent.type === "exit") onExit(pendingEvent.data)
    setPendingEvent(null)
  }, [pendingEvent, onEnemyContact, onChestContact, onExit])

  useEffect(() => {
    const handleKeyDown = (e) =>  {
      switch (e.key) {
        case 'ArrowUp': tryMove(0, -1); break
        case 'ArrowDown': tryMove(0, 1); break
        case 'ArrowLeft': tryMove(-1, 0); break
        case 'ArrowRight': tryMove(1, 0); break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tryMove])

  return position
}