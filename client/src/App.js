import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import TodosList from "./todos/TodosList";
import AddTodo from "./todos/AddTodo";
import UsersList from "./users/UsersList";
import PostsList from "./posts/PostsList";
import Photos from "./photos/PhotosList";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home page</h1>} />
            <Route path="/todos" element={<TodosList />} />
            <Route path="/todos/add" element={<AddTodo />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/photos" element={<Photos />} />
          </Route>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
