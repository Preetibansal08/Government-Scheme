const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        
        // Drop and recreate tables (CAUTION: This will delete existing data)
        await sequelize.sync({ force: true });
        console.log('Database recreated with correct schema');
        
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`POST /api/auth/register - Register user`);
            console.log(`POST /api/auth/login - Login user`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message);
        process.exit(1);
    }
};

startServer();