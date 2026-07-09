import { useGame } from "../context/GameContext.jsx"
import BattleScreen from "../screens/BattleScreen.jsx"
import DungeonScreen from "../screens/DungeonScreen.jsx"
import MenuScreen from "../screens/MenuScreen.jsx"
import RestScreen from "../screens/RestScreen.jsx"

const screens = {
  menu: MenuScreen,
  dungeon: DungeonScreen,
  battle: BattleScreen,
  rest:  RestScreen,
}

export default function ScreenRouter() {
  const { screen } = useGame()
  const CurrentScreen = screens[screen]
  return <CurrentScreen />
}