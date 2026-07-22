import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useCurrency } from "../hooks/useCurrency.js"
import { useItems } from "../hooks/useItems.js"
import { ItemTypes } from "../game/itemTypes.js"
import { maps } from "../game/maps/index.js"
import { menuStyles } from "../styles/menuStyles.js"
import Modal from "./Modal.jsx"
import MenuButton from "./MenuButton.jsx"

export default function ShopModal() {
  const { closeModal } = useGame()
  const { gameState } = useGameState()
  const { gold, addGold } = useCurrency()
  const { addItem } = useItems()

  const map = maps[gameState.currentMap]
  const restockSources = Array.isArray(map?.restockFrom)
    ? map.restockFrom
    : map?.restockFrom ? [map.restockFrom] : []
  const stockPool = [...new Set(restockSources.flatMap((sourceId) => maps[sourceId]?.lootPool ?? []))]

  const handleBuy = (itemId) => {
    const item = ItemTypes[itemId]
    if (!item || gold < item.price) return
    addGold(-item.price)
    addItem(itemId)
  }

  return (
    <Modal>
      <h2 className={menuStyles.headerStyle}>Shop</h2>
      <p>Gold: {gold}</p>

      {stockPool.length === 0 && <p>Nothing for sale.</p>}
      {stockPool.map((itemId) => {
        const item = ItemTypes[itemId]
        const label = item?.name ?? itemId
        const price = item?.price ?? 0

        return (
          <div key={itemId} className="flex items-center gap-2">
            <span>{label} - {price}g</span>
            <MenuButton onClick={() => handleBuy(itemId)} disabled={gold < price}>
              Buy
            </MenuButton>
          </div>
        )
      })}

      <MenuButton onClick={closeModal}>Leave</MenuButton>
    </Modal>
  )
}