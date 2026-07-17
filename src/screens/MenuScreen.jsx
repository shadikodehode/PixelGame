import { useGame } from "../context/GameContext.jsx"
import { useSaveGame } from "../hooks/useSaveGame.js"
import Logout from "../components/Logout.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function MenuScreen() {
  const { goTo } = useGame()
  const { loading, saveGame, loadGame, resetGame } = useSaveGame()
  
  if (loading) return (
    <CenterDiv>
      <p>Loading save...</p>
    </CenterDiv>)

  return (
    <CenterDiv>
      <h1>SewerMike</h1>
      <button onClick={() => goTo("dungeon")}>Start</button>
      <button>Reset Map</button>
      <button onClick={resetGame}>Delete save</button>
      <Logout />
    </CenterDiv>
  )
}