import { useEffect, useState } from "react";
import Axios from "axios";
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const { data } = await Axios.get("http://localhost:5000/api/users");
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (users.length === 0) return <h1>Louding</h1>;
  return (
    <>
      {users.map((user, index) => {
        return <div>{`user name: ${user.name}`}</div>;
      })} 
    </>
  );
};

export default UsersList;
