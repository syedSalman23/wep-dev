const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./db');

const app = express();

const PORT = 3000;

const SECRET_KEY = 'mysecretkey';

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {

    res.send('Backend Server Running');

});

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql =
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {

                if (err) {

                    res.status(500).json({
                        error: err
                    });

                } else {

                    res.json({
                        message: 'User registered successfully'
                    });

                }

            }
        );

    } catch (error) {

        res.status(500).json({
            error: error
        });

    }

});

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const sql =
        'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {

        if (err) {

            return res.status(500).json({
                error: err
            });

        }

        if (results.length === 0) {

            return res.status(401).json({
                message: 'User not found'
            });

        }

        const user = results[0];

        const match =
            await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(401).json({
                message: 'Invalid password'
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            SECRET_KEY,

            {
                expiresIn: '1h'
            }

        );

        res.json({
            message: 'Login successful',
            token: token
        });

    });

});

function authenticateToken(req, res, next) {

    const authHeader =
        req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: 'Token missing'
        });

    }

    const token =
        authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {

        if (err) {

            return res.status(403).json({
                message: 'Invalid token'
            });

        }

        req.user = user;

        next();

    });

}

app.get('/dashboard', authenticateToken, (req, res) => {

    res.json({
        message: 'Welcome to Dashboard',
        user: req.user
    });

});

app.get('/users', authenticateToken, (req, res) => {

    db.query(
        'SELECT id, name, email FROM users',
        (err, results) => {

            if (err) {

                res.status(500).json({
                    error: err
                });

            } else {

                res.json(results);

            }

        }
    );

});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});