import { useGame } from "../context/GameContext.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function GameOverScreen() {
  const { goTo } = useGame()

  return (
    <CenterDiv>
      <h1>YOU DIED</h1>
      <button onClick={() => goTo("menu")}>Return to menu</button>
    </CenterDiv>
  )
}