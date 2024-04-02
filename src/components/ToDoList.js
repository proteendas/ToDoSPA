import "../pages/Login.scss";
import { ToDoComponent } from "../components/ToDoComponent";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const ToDoList = ({ toDoList, handleToggle, handleDelete }) => {
  const { logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {toDoList.map((todo) => {
        return <ToDoComponent todo={todo} handleDelete={handleDelete} />;
      })}
      <Link className="text-link" to="/">
        <button className="submit-button" onClick={handleSignOut}>
          Logout
        </button>
      </Link>
    </div>
  );
};
