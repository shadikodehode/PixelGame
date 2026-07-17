import { commonStyles } from "../styles/commonStyles.js"

export default function CenterDiv({ children }) {
  return (
    <div className={commonStyles.center}>
        {children}
    </div>
  )
}