import "./HomePage.scss";

import task_icon from "../components/assets/task.png";
import add_icon from "../components/assets/add-post.png";

import React, { useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import { ToDoList } from "../components/ToDoList";

import { auth } from "../firebase";

import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { NavBar } from "../components/NavBar";

export const HomePage = () => {
  useTitle("Home");

  const [toDoList, setToDoList] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const q = query(collection(db, auth.currentUser.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArray = [];
      querySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id });
      });
      setToDoList(todoArray);
    });
    return () => unsub();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, auth.currentUser.uid), {
      completed: !todo.completed,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, auth.currentUser.uid, id));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task !== "") {
      await addDoc(collection(db, auth.currentUser.uid), {
        task,
        completed: false,
      });
      setTask("");
    }
  };

  return (
    <>
      <div className="home">
        <NavBar />
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
                  value={task}
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
          <ToDoList
            toDoList={toDoList}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};
