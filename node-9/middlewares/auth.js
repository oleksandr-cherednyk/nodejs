export function createAuthMiddlewares(User) {
  
  // Проверка авторизации
  async function auth(req, res, next) {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();
  }

  // mustChangePassword
  function checkMustChangePassword(req, res, next) {
    if (req.user.mustChangePassword === true) {
      return res.status(403).json({ message: 'Must change password' });
    }
    next();
  }

  // role admin
  function checkAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  }

  return { auth, checkMustChangePassword, checkAdmin };
}
