import { useGame } from "../context/GameContext.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"

export default function VictoryScreen() {
  const { goTo } = useGame()
  return (
    <CenterDiv>
      <h1>VICTORY</h1>
      <p>You defeated the Swamp King!</p>
      <button onClick={() => goTo("menu")}>Return to Menu</button>
    </CenterDiv>
  )  
}