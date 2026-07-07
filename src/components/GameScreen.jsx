import { useState } from "react";
import { generateFloor } from "../data/generateFloor";
import { RoomTypes } from "../data/roomTypes";

function GameScreen({ onBattle, onRest}) {
  const [floor, setFloor] = useState(() => generateFloor())
  const [roomIndex, setRoomIndex] = useState(0)

  const currentRoom = floor[roomIndex]

  function advance() {
    const next = floor[roomIndex]
    if (next.type === RoomTypes.sewer) onBattle()
    if (next.type === RoomTypes.rest) onRest()
  }

  return (
    <div  className={gameScreen}>
      <p>floor 1 - room {roomIndex + 1} / {floor.length}</p>
      <p>{getRoomDescription(currentRoom.type)}</p>
      <button onClick={advance}>Delve Deeper</button>
    </div>
  )
}

function getRoomDescription(type) {
  const desc = {
    sewer: "",
    rest: "",
    boss: "",
  }
}

//Refracture these, make them into their own components