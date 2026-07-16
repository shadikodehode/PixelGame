import { useGameState } from "../context/GameStateContext.jsx"

export function useCurrency() {
  const { gameState, updateGameState } = useGameState()

  const  addGold = (amount) => {
    updateGameState({ gold: gameState.gold + amount })
  }

  return { gold: gameState.gold, addGold }
}