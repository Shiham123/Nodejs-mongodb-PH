import { useLoaderData } from 'react-router-dom';

const Update = () => {
  const loader = useLoaderData();

  const { _id, nameValue, emailValue } = loader;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userName = formData.get('username');
    const email = formData.get('email');
    const user = { userName, email };

    fetch(`http://localhost:3000/users/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">User name</label>
        <input type="text" name="username" defaultValue={nameValue} />

        <label htmlFor="">Password</label>
        <input type="email" name="email" defaultValue={emailValue} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
