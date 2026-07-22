import { useCallback, useEffect, useState } from "react"

const buildSavePayload = (state) => {
  if (!state || typeof state !== 'object') return {}
  const { mapChests, mapEnemies, ...shape } = state

  return {
    currentMap: shape.currentMap,
    playerPosition: shape.playerPosition,
    hero: shape.hero,
    inventory: shape.inventory,
    gold: shape.gold,
    defeatedEnemies: shape.defeatedEnemies,
    defeatedBosses: shape.defeatedBosses,
    openedChests: shape.openedChests,
    mapSeeds: shape.mapSeeds,
  }
}

const sanitizeLoadData = (data) => {
  if (!data || typeof data !== 'object') return {}
  const { mapChests, mapEnemies, ...shape } = data
  return shape
}

export function useSaveGame(isLoggedIn) {
  const [savedData, setSavedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGame = useCallback(async () => {
    if (isLoggedIn === null) return null

    if (!isLoggedIn) {
      setSavedData({})
      setError(null)
      setLoading(false)
      return {}
    }
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/load', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load save')
      const sanitized = sanitizeLoadData(data)
      setSavedData(sanitized)
      return sanitized
    } catch (err) {
      console.error('Load save error:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [isLoggedIn])

  const saveGame = useCallback(async (save_data) => {
    if (!isLoggedIn) {
      setError("You're not logged in - progress won't be saved")
      return false
    }

    setError(null)

    try {
      const payload = buildSavePayload(save_data)
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ save_data: payload }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to save')
      setSavedData(payload)
      return true
    } catch (err) {
      console.error('Save game error:', err)
      setError(err.message)
      return false
    }
  }, [isLoggedIn])

  useEffect(() => {
    loadGame()
  }, [loadGame])

  return { savedData, loading, error, saveGame, loadGame }
}
