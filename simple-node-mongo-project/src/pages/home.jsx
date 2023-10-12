const HomePage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const emailValue = form.get('email');
    const nameValue = form.get('user');
    const user = { emailValue, nameValue };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">User name: </label>
        <input type="text" name="user" />

        <label htmlFor="">email : </label>
        <input type="email" name="email" />

        <button type="submit">Add user</button>
      </form>
    </div>
  );
};

export default HomePage;
