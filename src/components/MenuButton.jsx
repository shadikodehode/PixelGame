import { menuStyles } from "../styles/menuStyles.js"

export default function MenuButton({ children, onClick, disabled = false, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={menuStyles.buttonStyle}  
    >
      {children}
    </button>
  )
}