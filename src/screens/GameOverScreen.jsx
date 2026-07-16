import { useGame } from "../context/GameContext.jsx"

export default function GameOverScreen() {
  const { goTo } = useGame()
  return (
    <div className="flex flex-col gap-4">
      <h1>YOU DIED</h1>
      <button onClick={() => goTo("menu")}>Return to menu</button>
    </div>
  )
}