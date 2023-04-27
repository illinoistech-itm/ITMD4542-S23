const todosRepo = require('../src/todosSQLiteRepository');
const { todos_detail } = require('../controllers/todoController');

jest.mock('../src/todosSQLiteRepository');

const req = {
  params: {
    uuid: 250
  }
};

const res = {
  render: jest.fn((x) => x),
  redirect: jest.fn((x) => x)
};

it('GET single todo should send a status of 200', async ()=>{
  todosRepo.findById.mockImplementationOnce(() => ({
    id: 250,
    text: 'mocked todo text'
  }));
  todos_detail(req, res);
  expect(res.render).toHaveBeenCalledWith('todo', { title: 'Your Todo', todo: {
    id: 250, 
    text: 'mocked todo text'
  } });
});

it('GET single todo not found should send a redirect', async () => {
  todosRepo.findById.mockImplementationOnce(() => null);
  todos_detail(req, res);
  expect(res.redirect).toHaveBeenCalledWith('/todos');
});