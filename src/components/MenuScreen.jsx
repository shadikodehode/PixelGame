function MenuScreen({ onStart }) {
  return (
    <div className={menuRoot}>
      <h1 className={title}>Name</h1>
      <p className={subtitle}>subtitle</p>

      <div className={menuButtons}>
        <button onClick={onStart}>New Game</button>
        <button onClick={() => console.log("load")}>Load Game</button>
        <button onClick={() => console.log("links")}>Link</button>
      </div>

    </div>
  )
}