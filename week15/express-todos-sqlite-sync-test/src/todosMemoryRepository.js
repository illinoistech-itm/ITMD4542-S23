const crypto = require('crypto');
const db = new Map();

db.set('395a4dc6-7a90-42e3-a1b0-df35beca0fc3', {text: 'This is todo 1 text', id: '395a4dc6-7a90-42e3-a1b0-df35beca0fc3'});
db.set('c6d9a342-616f-47c3-b69e-123be63d732b', {text: 'This is todo 2 text', id: 'c6d9a342-616f-47c3-b69e-123be63d732b'});

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