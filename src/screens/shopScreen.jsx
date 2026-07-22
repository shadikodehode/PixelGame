import { useGame } from "../context/GameContext.jsx"
import { useGameState } from "../context/GameStateContext.jsx"
import { useHero } from "../hooks/useHero.js"
import { useCurrency } from "../hooks/useCurrency.js"
import { useItems } from "../hooks/useItems.js"
import { ItemTypes } from "../game/itemTypes.js"
import { maps } from "../game/maps/index.js"
import CenterDiv from "../containers/CenterDiv.jsx"
import MenuButton from "../components/MenuButton.jsx"

export default function ShopScreen() {
  const { goTo } =  useGame()
  const { gameState } = useGameState()
  const { hero, fullHeal } = useHero()
  const { gold, addGold } = useCurrency()
  const { addItem } = useItems()
  
  const map = maps[gameState.currentMap]
  const shopPool = map?.shopPool == []

  const handleBuy = (itemId) => {
    const item  = ItemTypes[itemId]
    if (gold < item.price) return
    addGold(-item.price)
    addItem(itemId)
  }
  
  return (
    <CenterDiv>
      <p>Gold: {gold}</p>

      <p>HP: {hero.health} / {hero.maxHealth}</p>
      {hero.health < hero.maxHealth && (
        <MenuButton onClick={fullHeal}>Rest</MenuButton>
      )}

      <h2>Wares</h2>
      {shopPool.length === 0 && <p>Nothing for sale.</p>}
      {shopPool.map((itemId) => {
        const item = ItemTypes[itemId]
        return (
          <div key={itemId} className="flex items-center gap-2">
            <span>{item.name} - {item.price}g</span>
            <MenuButton onClick={() => handleBuy(itemId)} disabled={gold < item.price}>
              Buy
            </MenuButton>
          </div>
        )
      })}

      <MenuButton onClick={() => goTo("dungeon")}>Continue</MenuButton>
    </CenterDiv>
  )
}