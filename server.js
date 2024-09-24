const express = require('express');
const db = require('./assets/connector');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something Went Wrong!'});
});

db.once('open', () =>{
    app.listen(PORT,() => {
        console.log('Api Server Runnig on port ${PORT}!!');
    });
});