import GameCanvas from "../components/GameCanvas.jsx"
import { useGame } from "../context/GameContext.jsx"

export default function DungeonScreen() {
  const { goTo } = useGame()

  return (
    <>
      <GameCanvas 
        mapId="floor1"
        onEnemyContact={(enemy) => goTo("battle")}
        onExit={(exit) => goTo("dungeon")}
      />
      <button onClick={() => goTo("rest")}>Rest</button>
    </>
  )
}