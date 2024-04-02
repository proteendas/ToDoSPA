import "./Login.scss";

import task_icon from "../components/assets/task.png";
import add_icon from "../components/assets/add-post.png";
import data from "../components/data.json";

import React, { useState } from "react";
import { useTitle } from "../hooks/useTitle";
import { ToDoList } from "../components/ToDoList";

export const HomePage = () => {
  useTitle("Home");

  const [toDoList, setToDoList] = useState(data);
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [
      ...copy,
      { id: toDoList.length + 1, task: userInput, complete: false },
    ];
    if (userInput !== "") setToDoList(copy);
  };

  const handleDelete = (id) => {
    setToDoList(toDoList.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <div className="container__header">
        <div className="container__text">Task List</div>
        <div className="container__text--underline"></div>
      </div>
      <div className="container__inputbox">
        <form className="container__taskinput" onSubmit={handleSubmit}>
          <div className="container__inputfield">
            <img
              src={task_icon}
              className="container__inputfieldicon"
              alt="user_icon"
            />
            <input
              type="text"
              value={userInput}
              onChange={handleChange}
              placeholder="Add Task"
            />
          </div>
          <button className="container__taskaddbtn">
            <img
              src={add_icon}
              className="container__inputfieldicon"
              alt="user_icon"
            />
          </button>
        </form>
      </div>
      <ToDoList toDoList={toDoList} handleDelete={handleDelete} />
    </div>
  );
};
