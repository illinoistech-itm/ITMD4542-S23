const crypto = require('crypto');
const db = new Map();

db.set('a8baac71-8912-4973-bded-b53d72879457', {text: 'This is todo 1 text', id: 'a8baac71-8912-4973-bded-b53d72879457'});
db.set('1684280-1233-474b-9bcc-130efb85d924', {text: 'This is todo 2 text', id: '1684280-1233-474b-9bcc-130efb85d924'});

const repo = {
  findAll: () => Array.from(db.values()),
  findById: (uuid) => db.get(uuid),
  create: (todo) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todo.text,
    };
    db.set(newTodo.id, newTodo);
  },
  deleteById: (uuid) => db.delete(uuid),
  update: (todo) => db.set(todo.id, todo),
};

module.exports = repo;