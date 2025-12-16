import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import sequelize from './config/db.js';
import initUser from './models/User.js';
import { createAuthMiddlewares } from './middlewares/auth.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// инициализируем модель
const User = initUser(sequelize);

// берём middleware
const { auth, checkMustChangePassword, checkAdmin } = createAuthMiddlewares(User);


//  register
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, passwordHash });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// login 
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Wrong password' });

    if (user.mustChangePassword === true) {
      return res.status(403).json({ message: 'Must change password', userId: user.id });
    }

    return res.json({ message: 'Login success', userId: user.id });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// change password
app.post('/change-password', auth, async (req, res) => {
  try {
    const { newPassword } = req.body;

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await req.user.update({
      passwordHash,
      mustChangePassword: false
    });

    return res.json({ message: 'Password changed' });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// delete-account
app.post('/delete-account', auth, async (req, res) => {
  try {
    const { password } = req.body;

    const ok = await bcrypt.compare(password, req.user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Wrong password' });

    await req.user.destroy();
    return res.json({ message: 'Account deleted' });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// admin (только admin)
app.get('/admin', auth, checkMustChangePassword, checkAdmin, (req, res) => {
  res.json({ message: 'Welcome, admin' });
});


// change-email
app.post('/change-email', auth, async (req, res) => {
  try {
    const { newEmail, password } = req.body;

    const ok = await bcrypt.compare(password, req.user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Wrong password' });

    const exists = await User.findOne({ where: { email: newEmail } });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    await req.user.update({ email: newEmail });

    return res.json({ message: 'Email changed', email: req.user.email });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// запуск
sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
  })
  .catch(() => console.log('DB connection error'));
