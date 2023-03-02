const { MongoClient, ObjectId } = require('mongodb');
const Todo = require('./Todo');

//const url = 'mongodb://localhost:27017';
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function run() {
  await client.connect();
  return 'Connected to the MongoDB server...';
}

run()
  .then(console.log)
  .catch(console.error);

const repo = {
  findAll: async () => {
    let todos = [];
    const todosColl = client.db('express-todos').collection('todos');
    const cursor = todosColl.find({});
    await cursor.forEach(doc => {
      const aTodo = new Todo(doc._id.toString(), doc.text);
      todos.push(aTodo);
    });
    return todos;
  },
  findById: async (uuid) => {
    const todosColl = client.db('express-todos').collection('todos');
    const filter = {
      '_id': new ObjectId(uuid)
    };
    const doc = await todosColl.findOne(filter);
    return new Todo(doc._id.toString(), doc.text);
  },
  create: async (todo) => {
    const doc = {text: todo.text};
    const todosColl = client.db('express-todos').collection('todos');
    const result = await todosColl.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  },
  deleteById: async (uuid) => {
    const todosColl = client.db('express-todos').collection('todos');
    const filter = {
      '_id': new ObjectId(uuid)
    };
    const result = await todosColl.deleteOne(filter);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted a documents.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  },
  update: async (todo) => { 
    const todosColl = client.db('express-todos').collection('todos');
    const filter = {
      '_id': new ObjectId(todo.id)
    };
    const updateDoc = {
      $set: {
        text: todo.text
      }
    };
    const result = await todosColl.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} docs matched the filter, updated ${result.modifiedCount} document(s)`);
  },
};

module.exports = repo;