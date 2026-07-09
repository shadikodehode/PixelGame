import { useCallback, useEffect, useState } from "react"

export function useSaveGame() {
  const [savedData, setSavedData] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadGame = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/load', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setSavedData(data)
      return data
    } catch (err) {
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const saveGame = useCallback(async (save_data) => {
    try {
      const res = await fetch('/api/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ save_data }),
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      setSavedData(save_data)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }, [])

  useEffect(() => {
    loadGame()
  }, [loadGame])

  return { savedData, loading, saveGame, loadGame }
}
