import { useGame } from "../context/GameContext.jsx"
import BattleScreen from "../screens/BattleScreen.jsx"
import DungeonScreen from "../screens/DungeonScreen.jsx"
import MenuScreen from "../screens/MenuScreen.jsx"
import RestScreen from "../screens/RestScreen.jsx"
import GameOverScreen from "../screens/GameOverScreen.jsx"
import VictoryScreen from "../screens/VictoryScreen.jsx"
import MenuModal from "./MenuModal.jsx"
import InventoryModal from "./InventoryModal.jsx"
import CenterDiv from "../containers/CenterDiv.jsx"
import AuthScreen from "../screens/AuthScreen.jsx"

const screens = {
  menu: MenuScreen,
  auth: AuthScreen,
  dungeon: DungeonScreen,
  battle: BattleScreen,
  rest:  RestScreen,
  gameover: GameOverScreen,
  victory: VictoryScreen,
}

const NO_MENU_BUTTON_SCREENS = new Set(["menu", "auth"])

export default function ScreenRouter() {
  const { screen, screenData, activeModal, openModal } = useGame()
  const CurrentScreen = screens[screen]

  return (
    <CenterDiv>
      {!NO_MENU_BUTTON_SCREENS.has(screen) && (
        <button onClick={() => openModal("menu")} className="fixed top-2 right-2 z-50">
          Menu
        </button>
      )}
      <CurrentScreen {...screenData} />
      {activeModal === "menu" && <MenuModal />}
      {activeModal === "inventory" && <InventoryModal />}
    </CenterDiv>
  )
}