const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('simple app');
});

const uri =
  'mongodb+srv://project-ph-one:xlcbjzCKdWHGMTQw@cluster-one.wolxfeo.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db('usersDB');
    const usersCollections = database.collection('users');

    // get method
    app.get('/users', async (request, response) => {
      const cursor = usersCollections.find();
      const result = await cursor.toArray();
      response.send(result);
    });

    app.get('/users/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.findOne(query);
      response.send(result);
    });

    // post method
    app.post('/users', async (request, response) => {
      const user = request.body;
      const result = await usersCollections.insertOne(user);
      response.send(result);
    });

    app.put('/users/:id', async (request, response) => {
      const id = request.params.id;
      const updateUser = request.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatedUser = {
        $set: {
          emailValue: updateUser.userName,
          nameValue: updateUser.email,
        },
      };
      const result = await usersCollections.updateOne(
        filter,
        updatedUser,
        option
      );
      response.send(result);
    });

    app.delete('/users/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.deleteOne(query);
      response.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
}
run();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
