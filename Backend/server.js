const app = require('./src/app'); // your Express app
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sync tables with models (development safe)
    await sequelize.sync({ alter: true });
    console.log('Database synced with models');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('POST /api/auth/register - Register user');
      console.log('POST /api/auth/login - Login user');
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
};

// Call the function to start server
startServer();