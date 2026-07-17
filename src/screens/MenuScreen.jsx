import SaveButton from "../components/SaveButton.jsx"
import LoadButton from "../components/LoadButton.jsx"
import { useGame } from "../context/GameContext.jsx"
import { useSaveGame } from "../hooks/useSaveGame.js"
import { useState } from "react"
import Logout from "../components/Logout.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function MenuScreen() {
  const { goTo } = useGame()
  const { loading, saveGame, loadGame, resetGame } = useSaveGame()
  const [player, setPlayer] = useState(null)
  
  if (loading) return (
    <CenterDiv>
      <p>Loading save...</p>
    </CenterDiv>)

  return (
    <CenterDiv>
      <h1>SewerMike</h1>

      <SaveButton getData={() => ({ })} onSave={saveGame} />
      <LoadButton onLoad={async () => setPlayer(await loadGame())} />

      <button onClick={() => goTo("dungeon")}>Start</button>
      <button onClick={Logout}>Logout</button>
      <button onClick={resetGame}>Reset save(dev)</button>
    </CenterDiv>
  )
}