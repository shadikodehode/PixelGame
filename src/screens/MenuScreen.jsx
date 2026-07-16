import SaveButton from "../components/SaveButton.jsx"
import LoadButton from "../components/LoadButton.jsx"
import { useGame } from "../context/GameContext.jsx"
import { useSaveGame } from "../hooks/useSaveGame.js"
import { useState } from "react"
import { commonStyles } from "../styles/commonStyles.js"

export default function MenuScreen() {
  const { goTo } = useGame()
  const { loading, saveGame, loadGame, resetGame } = useSaveGame()
  const [player, setPlayer] = useState(null)

  const center = commonStyles.center
  
  if (loading) return <p>Loading save...</p>

  return (
    <div className={`${center}`}>
      <h1>SewerMike</h1>

      <SaveButton getData={() => ({ })} onSave={saveGame} />
      <LoadButton onLoad={async () => setPlayer(await loadGame())} />

      <button onClick={() => goTo("dungeon")}>Start</button>
      <button onClick={resetGame}>Reset save(dev)</button>
    </div>
  )
}