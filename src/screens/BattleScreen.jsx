import { useGame } from "../context/GameContext.jsx"

export default function BattleScreen() {
  const { goTo } = useGame()
  return (
    <div>
      <h1>BATTLESCREEN</h1>
      <button onClick={() => goTo("rest")}>Rest</button>
    </div>
  )
}