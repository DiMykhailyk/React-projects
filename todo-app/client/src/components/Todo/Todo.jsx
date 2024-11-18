import React, { useEffect, useState } from "react";
import styles from "./Todo.module.css";
import { Button } from "../button/Button.jsx";
import { TodosPage } from "..//../pages/TodosPage/TodosPage.jsx";
import { useCallApi } from "..//..//hooks/useCallApi.js";

export const Todo = ({
  getTodos,
  id,
  label,
  checked,
  onCheck,
  onChange,
  deleted,
}) => {
  const [showing, setShowing] = useState(true);
  const [inputCreateTodo, setInputCreateTodo] = useState("");

  const isInputShow = { display: showing ? null : "none" };

  const createTodoValue = (e) => {
    setInputCreateTodo(e.target.value);
  };

  const deleteTodo = () => deleted(id, label);

  const showInput = () => {
    setShowing(false);
    setInputCreateTodo(label);
  };

  const updateTodos = (e) => {
    if (e.keyCode === 13) {
      useCallApi(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        label: inputCreateTodo,
        checked: false,
      }).then((data) => {
        setShowing(true);
        getTodos();
      });
    }
  };

  return (
    <li className={styles.todoLi}>
      <div onDoubleClick={showInput} className={styles.todoDiv}>
        <input
          onChange={onChange}
          className={styles.inputCheckBox}
          style={isInputShow}
        />
        <label className={styles.todoLabel} style={isInputShow}>
          {showing ? label : inputCreateTodo}
        </label>
        <button
          onClick={deleteTodo}
          className={styles.btnCancel}
          style={isInputShow}
        >
          x
        </button>
      </div>
      <input
        value={inputCreateTodo}
        onChange={createTodoValue}
        onKeyDown={updateTodos}
        className={styles.inputCreateTodo}
        style={{ display: showing ? "none" : "block" }}
      />
    </li>
  );
};
