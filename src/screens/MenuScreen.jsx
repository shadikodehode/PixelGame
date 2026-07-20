import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useSaveGame } from "../hooks/useSaveGame.js"
import Logout from "../components/Logout.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function MenuScreen() {
  const { goTo } = useGame()
  const { gameState, resetMap } = useGameState()
  const { loading, resetGame, error } = useSaveGame()
  
  if (loading) return (
    <CenterDiv>
      <p>Loading save...</p>
    </CenterDiv>)

  return (
    <CenterDiv>
      <h1>SewerMike</h1>
      {error ? <p className="text-sm text-red-400 mb-4">{error}</p> : null}
      <button onClick={() => goTo("dungeon")}>Start</button>
      <button onClick={() => resetMap()}>Reset Map</button>
      <button onClick={resetGame}>Delete save</button>
      <Logout />
    </CenterDiv>
  )
}