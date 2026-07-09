import { useGame } from "../context/GameContext.jsx"

export default function RestScreen() {
  const { goTo } = useGame()
  return (
    <div>
      <h1>RESTSCREEN</h1>
      <button onClick={() => goTo("menu")}>menu</button>
    </div>
  )
}