import { useGame } from "../context/GameContext.jsx"
import { useItems } from "../hooks/useItems.js"
import { useHero } from "../hooks/useHero.js"
import { ItemTypes } from "../game/itemTypes.js"
import { menuStyles } from "../styles/menuStyles.js"
import Modal from "./Modal.jsx"

export default function InventoryModal() {
  const { closeModal, openModal } = useGame()
  const { inventory, equip, unequi, useItem } = useItems()
  const { hero } = useHero()
  
  return (
    <Modal>
      <h2 className={menuStyles.headerStyle}>Inventory</h2>
      <p>Weapon: {hero.equippedWeapon ? ItemTypes[hero.equippedWeapon].name :"None"}
        {hero.equippedWeapon && <button onClick={() => unequip("weapon")}>Unequip</button>}
      </p>
      <p>Armor: {hero.equippedArmor ? ItemTypes[hero.equippedArmor].name : "None"}
        {hero.equippedArmor && <button onClick={() => unequip("armor")}>Unequip</button>}
      </p>
      {inventory.length === 0 && <p>No items yet.</p>}
      {inventory.map((itemId, i) =>{
        const item = ItemTypes[itemId]
        const isEquipped = hero.equippedWeapon === itemId || hero.equippedArmor === itemId

        return (
          <div key={itemId + i}>
            <span>{item.name} ({item.type})</span>
            {item.type !== "consumable" && !isEquipped && (
              <button onClick={() => equip(itemId)}>Equip</button>
            )}
            {item.type === "consumable" && (
              <button onClick={()=> useItem(itemId)}>Use</button>
            )}
            {isEquipped && <span> (equipped)</span>}
          </div>
        )
      })}
      <button onClick={() => openModal("menu")}>Back</button>
      <button onClick={closeModal}>Close</button>
    </Modal>
  )
}