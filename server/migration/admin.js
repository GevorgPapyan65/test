const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = async () => {
    const adminEmail = 'admin@example.com'; // Change to your desired admin email
    const adminPassword = 'admin'; // Change to your desired admin password
  
    if (process.env.CREATE_DEFAULT_ADMIN === 'true') {
      try {
        
        let adminUser = await User.findOne({ email: adminEmail });
  
        if (!adminUser) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(adminPassword, salt);
  
          adminUser = new User({
            firstname: 'Admin',
            lastname: 'User',
            email: adminEmail,
            password: hashedPassword,
            phone: '+374 99 999999',
            isAdmin: true
          });
  
          await adminUser.save();
          console.log('Default admin user created');
        } else {
          console.log('Default admin user already exists');
        }
      } catch (err) {
        console.error('Error creating default admin user:', err.message);
      }
    }
  };