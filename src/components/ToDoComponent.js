import "./ToDoComponent.scss";

export const ToDoComponent = ({ todo, toggleComplete, handleDelete }) => {
  return (
    <div className="task__container">
      <div
        className={todo.completed ? "task task--completed" : "task"}
        onClick={() => toggleComplete(todo)}
      >
        {todo.task}
      </div>
      <button className="task__deletebtn" onClick={() => handleDelete(todo.id)}>
        X
      </button>
    </div>
  );
};
