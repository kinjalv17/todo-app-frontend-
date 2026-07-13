function Disp({ todos, deleteTodo, toggleTodo }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty">No tasks yet… add something </p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "done" : ""}`}
          >
            <div>
              <span onClick={() => toggleTodo(todo.id)}>
                {todo.text}
              </span>

              <div className="meta">
                <small>
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </small>

                {todo.completedAt && (
                  <small>
                    Done: {new Date(todo.completedAt).toLocaleDateString()}
                  </small>
                )}
              </div>
            </div>

            <div className="actions">
              <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "Undo" : "Done"}
              </button>

              <button onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Disp;