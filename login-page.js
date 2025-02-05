const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// In-memory user data (for demonstration purposes)
const users = [];

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.send('User registered successfully');
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.send('Login successful');
    } else {
        res.send('Invalid username or password');
    }
});

// Protected blog route
app.get('/blog', isAuthenticated, (req, res) => {
    res.send('Welcome to the blog page!');
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out successfully');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
