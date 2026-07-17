import { menuStyles } from "../styles/menuStyles.js"

export default function Modal({ children }) {
  return (
    <div className={menuStyles.overlayStyle}>
      <div className={menuStyles.boxStyle}>
        {children}
      </div>
    </div>
  )
}