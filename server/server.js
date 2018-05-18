const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

//local
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	let id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Page not found');
	} else {
		Todo.findById(id).then((todo) => {
			if (!todo) {
				res.status(404).send('Page not found');
			} else {
				res.send(todo);
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	}

});

app.delete('/todos/:id', (req, res) => {
	let id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Page not found');
	} else {
		Todo.findByIdAndRemove(id).then((todo) => {
			if (!todo) {
				res.status(404).send('Page not found');
			} else {
				res.send(todo);
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	}
});

app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completedAt = null;
		body.completed = false;
	}


	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			res.status(404).send('Page not found');
		} else {
			res.send(todo);
		}
	}).catch((e) => {
		res.status(400).send(e);
	});

});

app.post('/user', (req, res) => {
	let body = _.pick(req.body, ['email', 'password', 'tokens']);

	let user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.listen(port, () => {
	console.log('Server is up on port: ' + port);
});


