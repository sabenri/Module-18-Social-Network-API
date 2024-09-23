const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialAppDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('Successfully connected to MongoDB'))
.catch((err) => console.error ('MongoDB connection error:', err));

connection.on ('connected', () => {
    console.log('Mongoose connected to the database')
});

connection.on ('disconnected', () => {
    console.log('Mongoose disconnected to the database');
});

module.exports = connection;