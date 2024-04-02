import "./ToDoComponent.scss";

export const ToDoComponent = ({ todo, handleDelete }) => {
  return (
    <div className="tasks">
      <div>{todo.task}</div>
      <button className="delete-button" onClick={() => handleDelete(todo.id)}>
        X
      </button>
    </div>
  );
};
