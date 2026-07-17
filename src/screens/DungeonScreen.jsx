import GameCanvas from "../components/GameCanvas.jsx"
import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useCurrency } from "../hooks/useCurrency.js"
import { commonStyles } from "../styles/commonStyles.js"
import { ObjectTypes } from "../game/objectTypes.js"
import { maps } from "../game/maps/index.js"
import { generateFloorEntities } from "../game/floorGenerator.js"
import { useMapTransition } from "../hooks/useMapTransition.js"
import { useFloorEntities } from "../hooks/useFloorEntities.js"
import { rollChestLoot } from "../game/lootTable.js"
import { useItems } from "../hooks/useItems.js"
import InventoryModal from "../components/InventoryModal.jsx"
import MenuModal from "../components/MenuModal.jsx"

export default function DungeonScreen() {
  const { goTo, activeModal, openModal } = useGame()
  const { gameState, updateGameState } = useGameState()
  const { gold, addGold } = useCurrency()
  const { travelTo } = useMapTransition()
  const { addItem } = useItems()
  
  const mapId = gameState.currentMap
  const map = maps[mapId]
  const { enemies, chests } = useFloorEntities(mapId, map)

  const center = commonStyles.center

  const handleChestContact = (chest) => {
    const { gold: goldFound, item } = rollChestLoot()
    addGold(goldFound)
    if (item) addItem(item)
    updateGameState({
      openedChests: [...gameState.openedChests, chest.id],
    })
  }

  return (
    <div className={`${center}`}>
      <p>Gold: {gold} </p>
      <GameCanvas 
        mapId={mapId}
        enemies={enemies}
        chests={chests}
        onEnemyContact={(enemy) => goTo("battle", { enemy })}
        onExit={travelTo}
        onChestContact={handleChestContact}
      />
      <button onClick={()=> openModal("menu")}>Menu</button>
      {activeModal === "inventory" && <InventoryModal />}
      {activeModal === "menu" && <MenuModal />}
    </div>
  )
}