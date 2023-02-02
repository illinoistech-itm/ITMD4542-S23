const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const db = new Map();

//db.set('a8baac71-8912-4973-bded-b53d72879457', {text: 'This is todo 1 text', id: 'a8baac71-8912-4973-bded-b53d72879457'});
//db.set('1684280-1233-474b-9bcc-130efb85d924', {text: 'This is todo 2 text', id: '1684280-1233-474b-9bcc-130efb85d924'});

const loadData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/todos.json'));
  const todosArray = JSON.parse(jsonData);
  todosArray.forEach(element => {
    db.set(element[0], element[1]);
  });
};

const saveData = () => {
  const stringifyData = JSON.stringify(Array.from(db));
  fs.writeFileSync(path.join(__dirname, '../data/todos.json'), stringifyData);
};

const repo = {
  findAll: () => Array.from(db.values()),
  findById: (uuid) => db.get(uuid),
  create: (todo) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todo.text,
    };
    db.set(newTodo.id, newTodo);
    saveData();
  },
  deleteById: (uuid) => {
    db.delete(uuid);
    saveData();
  },
  update: (todo) => {
    db.set(todo.id, todo);
    saveData();
  },
};

loadData();

module.exports = repo;