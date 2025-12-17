import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const JWT_SECRET = 'password'; 
const TOKEN_EXPIRES = '1h';

// Имитация базы данных

let users = [
  {
    id: 1,
    username: 'user',
    email: 'user@mail.com',
    password: await bcrypt.hash('123456', 10),
    role: 'user',
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@mail.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
  },
];

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES }
  );

  res.json({ token });
});


// JWT middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
}

// ROLE middleware
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}


// обновление email
app.put('/update-email', authenticateJWT, (req, res) => {
  const { newEmail } = req.body;

  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.email = newEmail;
  res.json({ message: 'Email updated', user });
});

// удаление аккаунта
app.delete('/delete-account', authenticateJWT, (req, res) => {
  const userExists = users.some(u => u.id === req.user.id);
  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter(u => u.id !== req.user.id);
  res.json({ message: 'Account deleted successfully' });
});


// обновление роли (admin only)
app.put(
  '/update-role',
  authenticateJWT,
  authorizeRole('admin'),
  (req, res) => {
    const { userId, role } = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    res.json({ message: 'Role updated', user });
  }
);


// refresh JWT
app.post('/refresh-token', authenticateJWT, (req, res) => {
  const newToken = jwt.sign(
    {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES }
  );

  res.json({ token: newToken });
});


// me
app.get('/me', authenticateJWT, (req, res) => {
  res.json(req.user);
});

// admin
app.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome admin' });
});


// server start
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
