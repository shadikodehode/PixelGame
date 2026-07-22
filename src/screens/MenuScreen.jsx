import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import Logout from "../components/Logout.jsx"
import MenuButton from "../components/MenuButton.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function MenuScreen() {
  const { goTo } = useGame()
  const { gameState, resetMap } = useGameState()
  const { loading, starNewGame, saveError, canSave } = useSaveGame()
  
  if (loading) return (
    <CenterDiv>
      <p>Loading save...</p>
    </CenterDiv>)

  const handleNewGame= () {
    if (canSave) {
      const confirmed = window.confirm(
        "Starting a new game will permently overwrite your existing save. Continue?"
      )
      if (!confirmed) return
    }
    starNewGame()
    goTo("dungeon")
  }

  return (
    <div>
      <div>
        [ Menu background art ]
      </div>

      <div>
        <div>
          [ Logo placeholder ]
        </div>

        {!canSave && (
          <p>
            You're not logged in - progress won't be saved.
          </p>
        )}
        {saveError ? <p>{saveError}</p> : null}
        
        <MenuButton onClick={handleNewGame}>New Game</MenuButton>
        <MenuButton onClick={() => goTo("dungeon")}>Continue</MenuButton>
        <MenuButton disabled title="coming soon">Options</MenuButton>
        <MenuButton disabled title="Not applicable in a browser tab">Quit</MenuButton>
        {isLoggedIn ? <Logout /> : <MenuButton onClick={() => goTo("auth")}>Login</MenuButton>}
      </div>
    </div>
  )
}