  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  export function validateSignup({ email, username, password }) {
    if (!email || !username || !password) return 'Missing fields'
    if (!emailRegex.test(email)) return 'Invalid email format'
    if (username.length < 3 || username.length > 20) return 'Username must be 3-20 characters'
    if (!passwordRegex.test(password)) return 'Password must be at least 8 characters and include uppercase, lowercase and a number'
  }