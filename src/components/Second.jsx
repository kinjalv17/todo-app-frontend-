function Second({ total, completed }) {
  return (
    <div className="stats">
      <div className="card">
        <h2>{total}</h2>
        <p>Total Tasks</p>
      </div>

      <div className="card">
        <h2>{completed}</h2>
        <p>Completed</p>
      </div>

      <div className="card">
        <h2>{total - completed}</h2>
        <p>Pending</p>
      </div>
    </div>
  );
}

export default Second;