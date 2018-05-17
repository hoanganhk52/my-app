const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = '5afd0b392d188050a70eb54d';
if (!ObjectID.isValid(id)) {
    console.log('ID is not valided');
} else {
    //id khong ton tai van success
    Todo.find({
        _id: id
    }).then((todos) => {
        console.log('Todos', todos);
    });

//id khong ton tai van success
    Todo.findOne({
        _id: id
    }).then((todo) => {
        console.log('Todo', todo);
    });

//id khong ton tai van success
    Todo.findById(id).then((todo) => {
        if (!todo) return console.log('ID not found');
        console.log('Todo', todo);
    });
}

