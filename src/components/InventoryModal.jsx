import { useGame } from "../context/GameContext.jsx"
import { useItems } from "../hooks/useItems.js"
import { useHero } from "../hooks/useHero.js"
import { ItemTypes } from "../game/itemTypes.js"
import { menuStyles } from "../styles/menuStyles.js"

export default function InventoryModal() {
  const { closeModal } = useGame()
  const { inventory, equip } = useItems()
  const { hero } = useHero()

  const overlay = menuStyles.overlayStyle
  const box = menuStyles.boxStyle
  
  return (
    <div className={overlay}>
      <div className={box}>
        <h2>Inventory</h2>
        <p>Weapon: {hero.euippedWeapon ? ItemTypes[hero.equippedWeapon].name :"None"}</p>
        <p>Armor: {hero.euippedArmor ? ItemTypes[hero.equippedArmor].name :"None"}</p>
        <hr />
        {inventory.length === 0 && <p>No items yet.</p>}
        {inventory.map((itemId, i) =>{
          const item= ItemTypes[itemId]
          const isEquipped = hero.equippedWeapon === itemId || hero.equippedArmor === itemId
          return (
            <div>
              <span>{item.name} ({item.type})</span>
              {item.type !== "consumable" && !isEquipped && (
                <button onClick={() => equip(itemId)}>Equip</button>
              )}
              {isEquipped && <span> (equipped)</span>}
            </div>
          )
        })}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}