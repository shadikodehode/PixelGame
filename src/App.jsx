import AuthGate from "./components/AuthGate.jsx"
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
          <AuthGate>
          <GameProvider>
          <ScreenRouter />
          </GameProvider>
          </AuthGate>
        }
      />
      </Routes>
  )
}

export default App
