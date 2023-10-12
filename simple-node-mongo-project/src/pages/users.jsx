import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
  const loader = useLoaderData();
  const [users, setUsers] = useState(loader);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updateUsers = users.filter((user) => user._id !== id);
        setUsers(updateUsers);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      {users.map((item, index) => {
        const { nameValue, _id } = item;
        return (
          <div key={index}>
            <h1>{nameValue}</h1>
            <Link to={`/update/${_id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(_id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
