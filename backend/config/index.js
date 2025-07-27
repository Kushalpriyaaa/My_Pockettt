const connectDB = require('./database');

// Validate port number
const getValidPort = () => {
  const envPort = process.env.PORT;
  const defaultPort = 5001;
  
  // If PORT is not set, use default
  if (!envPort) {
    console.log(`Using default port: ${defaultPort}`);
    return defaultPort;
  }
  
  // Convert to number and validate
  const portNum = parseInt(envPort, 10);
  
  // Check if it's a valid port number
  if (isNaN(portNum) || portNum <= 0 || portNum > 65535) {
    console.error(`Invalid PORT environment variable: "${envPort}". Using default port: ${defaultPort}`);
    return defaultPort;
  }
  
  console.log(`Using PORT from environment: ${portNum}`);
  return portNum;
};

module.exports = {
  connectDB,
  port: getValidPort(),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/efinance',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  deployedUrl: process.env.DEPLOYED_URL || 'https://my-pockettt-backend.onrender.com'
};
