import { useCallback, useEffect, useState } from "react"

export function useSaveGame() {
  const [savedData, setSavedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGame = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/load', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load save')
      setSavedData(data)
      return data
    } catch (err) {
      console.error('Load save error:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const saveGame = useCallback(async (save_data) => {
    setError(null)

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ save_data }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to save')
      setSavedData(save_data)
      return true
    } catch (err) {
      console.error('Save game error:', err)
      setError(err.message)
      return false
    }
  }, [])

  const resetGame = useCallback(async () => {
    setError(null)

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ save_data: {} }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to delete save')
      window.location.reload()
    } catch (err) {
      console.error('Reset save error:', err)
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    loadGame()
  }, [loadGame])

  return { savedData, loading, error, saveGame, loadGame, resetGame }
}
