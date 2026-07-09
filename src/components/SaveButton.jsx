export default function SaveButton({ getData, onSave }) {

  return (
    <button onClick={() => onSave(getData())}>
      Save
    </button>
  )
}