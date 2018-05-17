// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) return console.log('Unable to connect to MongoDB server');
    console.log('Connect successful');
    const db = client.db('TodoApp');

    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch((err) => {
        console.log('unable to fetch todos', err);
    });

    // db.collection('User').insertOne({
    //     name: 'Anh Pham Hoang',
    //     age: 29,
    //     location: 'Ha Noi, Viet Nam'
    // }, (err, result) => {
    //     if (err) return console.log('Unable to insert User', err);
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    client.close();
});

