import { useGame } from "../context/GameContext.jsx"
import { useSaveGame } from "../hooks/useSaveGame.js"
import { useGameState } from "../context/GameStateContext.jsx"
import { menuStyles } from "../styles/menuStyles.js"
import { useAuth } from "../context/AuthContext.jsx"
import Modal from "./Modal.jsx"


export default function MenuModal() {
  const { closeModal, openModal, goTo } = useGame()
  const { logout } = useAuth()
  const { saveGame, error } = useSaveGame()
  const { gameState } = useGameState()

  const handleSave = async () => {
    const success = await saveGame(gameState)
    if (success) closeModal()
  }

  const handleQuit= () => {
    closeModal()
    goTo("menu")
  }

  return (
    <Modal>
      <h2 className={menuStyles.headerStyle}>Menu</h2>
      <button onClick={closeModal}>Resume</button>
      <button onClick={() => { closeModal(); openModal("inventory") }}>Inventory</button>
      <button onClick={() =>{ closeModal(); goTo("rest") }}>Rest</button>

      <hr />

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button onClick={handleSave}>Save</button>
      <button onClick={logout}>Logout</button>
      <button onClick={handleQuit}>Quit</button>
      
    </Modal>
  )
}