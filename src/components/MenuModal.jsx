import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import { menuStyles } from "../styles/menuStyles.js"
import MenuButton from "./MenuButton.jsx"
import Modal from "./Modal.jsx"


export default function MenuModal() {
  const { closeModal, openModal, goTo } = useGame()
  const { isLoggedIn, logout } = useAuth()
  const { gameState, saveGame, saveError, canSave } = useGameState()

  const handleSave = async () => {
    const success = await saveGame(gameState)
    if (success) closeModal()
  }

  const handleQuit= () => {
    closeModal()
    goTo("menu")
  }

  const handleLogin = () => {
    closeModal()
    goTo("auth")
  }

  return (
    <Modal>
      <h2 className={menuStyles.headerStyle}>Menu</h2>
      <MenuButton onClick={closeModal}>Resume</MenuButton>
      <MenuButton onClick={() => { closeModal(); openModal("inventory") }}>Inventory</MenuButton>
      <MenuButton onClick={() =>{ closeModal(); goTo("rest") }}>Rest</MenuButton>

      <hr />

      {!canSave && <p>Log in to save your progress</p>}
      {saveError ? <p>{saveError}</p> : null}
      <MenuButton onClick={handleSave} disabled={!canSave} title={!canSave ? "Log in to save" : undefined}>
        Save
      </MenuButton>
      {isLoggedIn ? (
        <MenuButton onClick={logout}>Logout</MenuButton>
      ): (
        <MenuButton onClick={handleLogin}>Login</MenuButton>
      )}
      <MenuButton onClick={handleQuit}>Quit</MenuButton>
    </Modal>
  )
}