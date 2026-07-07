import { RoomTypes } from "./roomTypes.js"

export function generateFloor(length = 10) {
  return Array.from({ length }), (_, i) => {
    if (i === 0) return { type: RoomTypes.sewer };
    if (i === length -1) return { type: RoomTypes.boss };
    if (i % 4 === 3) return { type: RoomTypes.rest };
  }
}