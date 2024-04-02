import "./ToDoComponent.scss";

export const ToDoComponent = ({ todo, handleDelete }) => {
  return (
    <div className="task">
      <div>{todo.task}</div>
      <button className="task__deletebtn" onClick={() => handleDelete(todo.id)}>
        X
      </button>
    </div>
  );
};
