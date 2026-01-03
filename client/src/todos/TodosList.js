import { useEffect, useState } from "react";
import Axios from "axios";
const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const { data } = await Axios.get("http://localhost:5000/api/todos");
    setTodos(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  if (todos.length === 0) return <h1>Louding</h1>;
  return (
    <>
      {todos.map((todo, index) => {
        return <div>{todo.title}</div>;
      })} 
    </>
  );
};

export default TodosList;
