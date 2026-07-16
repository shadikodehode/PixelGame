import { useGame } from "../context/GameContext.jsx"
import { commonStyles } from "../styles/commonStyles.js"

export default function GameOverScreen() {
  const { goTo } = useGame()
  
  const center = commonStyles.center

  return (
    <div className={`${center}`}>
      <h1>YOU DIED</h1>
      <button onClick={() => goTo("menu")}>Return to menu</button>
    </div>
  )
}