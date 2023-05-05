const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', () =>{
    console.log('Connection to MongoDB was a success')
});

connection.on('error', () => {
    console.log('Issue with the connection to MongoDB', error)
})

module.exports = mongoose;