import { useGame } from "../context/GameContext";
import { useHero } from "../hooks/useHero";
import { menuStyles } from "../styles/menuStyles";
import Modal from "./Modal.jsx"
import MenuButton from "./MenuButton";

export default function bonfireModal(){
  const { closeModal } = useGame()
  const { hero, fullHeal } = useHero()

  return (
    <Modal>
      <h2 className={menuStyles.headerStyle}>Bonfire</h2>
      <p>HP: {hero.health} / {hero.maxHealth}</p>
      {hero.health < hero.maxHealth ? (
        <MenuButton onClick={fullHeal}>Rest</MenuButton>
      ): (
        <p>Full health.</p>
      )}
      <MenuButton onClick={closeModal}>Leave</MenuButton>
    </Modal>
  )
}