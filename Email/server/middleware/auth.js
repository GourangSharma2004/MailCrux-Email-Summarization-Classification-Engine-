const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');
    
    console.log('Auth middleware invoked, token:', token ? `${token.substring(0, 15)}...` : 'none');

    // Check if no token
    if (!token) {
      console.log('Auth failed: No token provided');
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mockjwtsecret');
      console.log('Token decoded successfully, user ID:', decoded.user.id);
      
      try {
        // Add user from payload
        const user = await User.findById(decoded.user.id).select('-password');
        if (user) {
          req.user = user;
          console.log('Auth successful: User found in database');
          return next();
        }
      } catch (dbError) {
        console.log('Database error, using mock user:', dbError.message);
        // If we can't find the user (DB might be down), provide a mock user for testing
        if (decoded.user.id === '123456789') {
          console.log('Auth using mock user with ID 123456789');
          req.user = {
            _id: '123456789',
            id: '123456789',
            name: 'Demo User',
            email: 'demo@example.com',
            preferences: {
              emailSyncFrequency: 'daily',
              autoCategorizationEnabled: true,
              summaryFrequency: 'weekly',
              notificationsEnabled: true
            }
          };
          return next();
        } else {
          console.log(`Auth failed: User ID ${decoded.user.id} not found and not matching mock ID`);
        }
      }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError.message);
      return res.status(401).json({ msg: 'Token is not valid - JWT verification failed' });
    }
    
    console.log('Auth failed: Token valid but user not found');
    return res.status(401).json({ msg: 'Token is not valid - User not found' });
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ msg: 'Token is not valid - General error' });
  }
}; 