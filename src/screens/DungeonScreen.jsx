import { useGame } from "../context/GameContext.jsx"

export default function DungeonScreen() {
  const { goTo } = useGame()

  return (
    <div>
      <h1>GAMESCREEN</h1>
      <button onClick={() => goTo("battle")}>battle</button>
    </div>
  )
}