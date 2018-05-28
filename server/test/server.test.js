const expect = require('expect');
const request = require('supertest');

//local
const {app} = require('./../server');
const {Todo} = require('./../models/todo');



describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		let text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200, done)			;
	});
});