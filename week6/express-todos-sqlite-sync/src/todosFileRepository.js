const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();
const Todo = require('./Todo');

// db.set('395a4dc6-7a90-42e3-a1b0-df35beca0fc3', {text: 'This is todo 1 text', id: '395a4dc6-7a90-42e3-a1b0-df35beca0fc3'});
// db.set('c6d9a342-616f-47c3-b69e-123be63d732b', {text: 'This is todo 2 text', id: 'c6d9a342-616f-47c3-b69e-123be63d732b'});

const loadData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/todos.json'));
  //const jsonData = fs.readFileSync('data/todos.json');
  const todosArray = JSON.parse(jsonData);
  todosArray.forEach(element => {
    const aTodo = new Todo(element[1].id, element[1].text);
    db.set(aTodo.id, aTodo);
  });
  console.log(db);
};

const saveData = () => {
  const stringifyData = JSON.stringify(Array.from(db));
  fs.writeFileSync(path.join(__dirname, '../data/todos.json'), stringifyData);
};

const repo = {
  findAll: () => Array.from(db.values()),
  findById: (uuid) => db.get(uuid),
  create: (todo) => {
    todo.id = crypto.randomUUID();
    db.set(todo.id, todo);
    saveData();
  },
  deleteById: (uuid) => {
    db.delete(uuid);
    saveData()
  },
  update: (todo) => { 
    db.set(todo.id, todo);
    saveData();
  },
};

loadData();

module.exports = repo;