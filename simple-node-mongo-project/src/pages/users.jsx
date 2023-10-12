import { useLoaderData } from 'react-router-dom';

const Users = () => {
  const loader = useLoaderData();

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      {loader.map((item, index) => {
        const { nameValue, _id } = item;
        return (
          <div key={index}>
            <h1>{nameValue}</h1>
            <button onClick={() => handleDelete(_id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
