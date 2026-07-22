import { Armor } from "./items/armor";
import { Consumables } from "./items/consumables";
import { Weapons } from "./items/weapons";

export const ItemTypes = {
  ...Weapons,
  ...Armor,
  ...Consumables,
}