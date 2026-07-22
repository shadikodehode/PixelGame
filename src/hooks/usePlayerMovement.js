import { useCallback, useEffect, useState } from "react"
import { TileTypes } from "../game/tileTypes.js"

export function usePlayerMovement({
  map, enemies, chests, onEnemyContact, onExit, onChestContact, onNpcContact, onBonfireContact,
  initialPosition, openedChests = [], defeatedEnemies = [],
}) {
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

      const enemy = enemies.find(
        e => e.x === next.x && e.y === next.y && !defeatedEnemies.includes(e.id)
      )
      if (enemy) {
        setPendingEvent({ type: "enemy", data: enemy })
        return current
      }

      const chest = chests.find(
        o => o.type === "chest" && o.x === next.x && o.y === next.y && !openedChests.includes(o.id)
      )
      if (chest) {
        setPendingEvent({ type: "chest", data: chest })
        return next
      }

      if (map.npc && map.npc.x === next.x && map.npc.y === next.y) {
        setPendingEvent({ type: "npc", data: map.npc })
        return current
      }

      if (map.bonfire && map.bonfire.x === next.x && map.bonfire.y === next.y) {
        setPendingEvent({ type: "bonfire", data: map.bonfire })
        return current
      }
      
      const exit = map.exits.find(
        e => e.x === next.x && e.y === next.y
      )
      if (exit) {
        setPendingEvent({ type: "exit", data: exit })
        return current
      }

      return next
    })
  }, [map, enemies, chests, openedChests, defeatedEnemies])

  useEffect(() => {
    if (!pendingEvent) return
    if (pendingEvent.type === "enemy") onEnemyContact(pendingEvent.data)
    if (pendingEvent.type === "chest") onChestContact(pendingEvent.data)
    if (pendingEvent.type === "exit") onExit(pendingEvent.data)
    if (pendingEvent.type === "npc") onNpcContact?.(pendingEvent.data)
    if(pendingEvent.type === "bonfire") onBonfireContact?.(pendingEvent.data)
    setPendingEvent(null)
  }, [pendingEvent, onEnemyContact, onChestContact, onExit, onNpcContact, onBonfireContact])

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