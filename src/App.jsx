import ResetPassword from "./components/ResetPassword.jsx"
import ScreenRouter from "./components/ScreenRouter.jsx"
import { GameProvider } from "./context/GameContext.jsx"
import { Routes, Route } from "react-router"

function App() {
  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route  
        path="/"
        element={
          <GameProvider>
            <ScreenRouter />
          </GameProvider>
        }
      />
      </Routes>
  )
}

export default App