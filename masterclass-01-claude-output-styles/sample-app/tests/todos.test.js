const request = require('supertest');
const app = require('../src/app');

describe('Todo API', () => {
  describe('GET /', () => {
    it('should return API status', async () => {
      const res = await request(app)
        .get('/')
        .expect(200);
      
      expect(res.body.message).toBe('Todo API is running!!!');
    });
  });

  describe('GET /api/todos', () => {
    it('should return empty array initially', async () => {
      const res = await request(app)
        .get('/api/todos')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'This is a test todo'
      };

      const res = await request(app)
        .post('/api/todos')
        .send(todoData)
        .expect(201);
      
      expect(res.body.title).toBe(todoData.title);
      expect(res.body.description).toBe(todoData.description);
      expect(res.body.id).toBeDefined();
      expect(res.body.completed).toBe(false);
    });

    // This test will expose the validation issues during the demo
    it('should handle invalid data gracefully', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({}) // Empty object
        .expect(201); // Currently passes, but should fail validation
      
      // This demonstrates the lack of validation
      expect(res.body.title).toBeUndefined();
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update an existing todo', async () => {
      // First create a todo
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Original Title' });
      
      const todoId = createRes.body.id;
      
      // Then update it
      const updateRes = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ title: 'Updated Title', completed: true })
        .expect(200);
      
      expect(updateRes.body.title).toBe('Updated Title');
      expect(updateRes.body.completed).toBe(true);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete an existing todo', async () => {
      // First create a todo
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'To be deleted' });
      
      const todoId = createRes.body.id;
      
      // Then delete it
      await request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(200);
      
      // Verify it's gone
      await request(app)
        .get(`/api/todos/${todoId}`)
        .expect(404);
    });
  });
});
