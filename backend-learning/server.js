const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Salman Backend Server');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/users', (req, res) => {

    const users = [
        { id: 1, name: 'Salman' },
        { id: 2, name: 'DevOps User' }
    ];

    res.json(users);

});
app.use(express.json());

app.post('/login', (req, res) => {

    console.log(req.body);

    res.json({
        message: 'Login successful'
    });

});
{
  "username": "salman",
  "password": "123"
}