const mysqlConnection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
    const { name, email, phone, role, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
        mysqlConnection.query(query, [name, email, phone, role, hashedPassword], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });

            res.status(201).json({ id: result.insertId, name, email, phone, role });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    mysqlConnection.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

exports.getUserByID = (req, res) => {
    const {id} = req.params;
    const query = 'SELECT id, name, email, phone, role FROM users WHERE id = ?';
    mysqlConnection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
exports.getUsers = (req, res) => {
    const query = 'SELECT id, name, email, phone, role FROM users';
    mysqlConnection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update User
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, phone, role, password } = req.body;

    let query = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ?';
    const queryParams = [name, email, phone, role];

    if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ error: err.message });

            query += ', password = ?';
            queryParams.push(hashedPassword);

            query += ' WHERE id = ?';
            queryParams.push(userId);

            mysqlConnection.query(query, queryParams, (err, result) => {
                if (err) return res.status(400).json({ error: err.message });

                res.json({ message: 'User updated successfully' });
            });
        });
    } else {
        query += ' WHERE id = ?';
        queryParams.push(userId);

        mysqlConnection.query(query, queryParams, (err, result) => {
            if (err) return res.status(400).json({ error: err.message });

            res.json({ message: 'User updated successfully' });
        });
    }
};

// Delete User
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    const query = 'DELETE FROM users WHERE id = ?';
    mysqlConnection.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
};