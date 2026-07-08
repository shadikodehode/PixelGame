import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null)


  const checkAuth = () => {
    fetch('/api/profile', { credentials: 'include' })
    .then(res => setIsLoggedIn(res.ok))
    .catch(() => setIsLoggedIn(false))
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = () => setIsLoggedIn(true)

  const logout = async () => {
    await  fetch('/api/logout', { method: 'POST', credentials: 'include' })
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

  export function useAuth(){
    return useContext(AuthContext)
  }
}