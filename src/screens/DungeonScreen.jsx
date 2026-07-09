import GameCanvas from "../components/GameCanvas.jsx"
import { useGame } from "../context/GameContext.jsx"

export default function DungeonScreen() {
  const { goTo } = useGame()

  return (
    <>
      <GameCanvas mapId="floor1" />
      <button onClick={() => goTo("rest")}>Rest</button>
    </>
  )
}