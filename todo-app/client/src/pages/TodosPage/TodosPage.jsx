import React, { useEffect, useState } from "react";
import styles from "./TodosPage.module.css";
import { Text } from "..//..//components/Text/Text.jsx";
import { MyInput } from "..//..//components/input/MyInput.jsx";
import { Button } from "..//..//components/button/Button.jsx";
import { Footer } from "..//..//components/Footer/Footer.jsx";
import { Todo } from "..//..//components/Todo/Todo.jsx";
import { useCallApi } from "..//..//hooks/useCallApi.js";

export const TodosPage = () => {
  const [inputCreateTodo, setInputCreateTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [visibleFooter, setVisibleFooter] = useState(false);

  const showFooter = () => {
    if (todos.length !== 0) {
      setVisibleFooter(true);
    }
  };

  useEffect(() => {
    showFooter();
  }, [todos]);

  const createTodoValue = (e) => {
    setInputCreateTodo(e.target.value);
  };

  const addTodoBtn = (e) => {
    if (inputCreateTodo === "") {
      return;
    }
    useCallApi("http://localhost:3001/todos", {
      method: "POST",
      label: inputCreateTodo,
      isChecked: false,
    }).then(() => {
      setInputCreateTodo("");
      getTodos();
    });
  };

  const addTodoEnter = (e) => {
    if (inputCreateTodo === "" || e.charCode !== 13) {
      return;
    }
    useCallApi("http://localhost:3001/todos", {
      method: "POST",
      label: inputCreateTodo,
      isChecked: false,
    }).then(() => {
      setInputCreateTodo("");
      getTodos();
    });
  };

  const deleteTodoFromId = (id, label) => {
    useCallApi(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
      label,
      checked: false,
    }).then(() => {
      const todosFilter = todos.filter((el) => el._id !== id);
      setTodos(todosFilter);
    });
  };

  const getTodos = () => {
    return useCallApi("http://localhost:3001/todos", {
      method: "GET",
    }).then((data) => setTodos(data.todos));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const renderTodos = () => {
    return todos.map((todo) => {
      return (
        <Todo
          key={todo._id}
          id={todo._id}
          getTodos={getTodos}
          checked={todo.isChecked}
          onCheck={todo.onCheck}
          label={todo.label}
          deleted={deleteTodoFromId}
        />
      );
    });
  };

  return (
    <>
      <Text text="todos" />
      <div className={styles.Todos}>
        <div className={styles.Wrapper}>
          <div className={styles.Container}>
            <MyInput
              type="text"
              placeholder="Create new todo..."
              onChange={createTodoValue}
              inputValue={inputCreateTodo}
              addTodoEnter={addTodoEnter}
            />
            <div className={styles.WrapperForButton}>
              <Button onClick={addTodoBtn} label="Submit" />
            </div>
          </div>
        </div>
        {renderTodos()}
        <Footer isVisible={{ display: visibleFooter ? "flex" : "none" }} />
      </div>
    </>
  );
};
