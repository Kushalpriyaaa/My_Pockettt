const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

// Initialize Express app
const app = express();

// Import config after dotenv is loaded
const { connectDB, port, corsOrigin, deployedUrl } = require('./config');

// Connect to database and start server
const startServer = async () => {
  try {
    // Debug configuration
    console.log('🔧 Server Configuration:');
    console.log(`   PORT: ${port} (type: ${typeof port})`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`   CORS_ORIGIN: ${corsOrigin}`);
    console.log(`   DEPLOYED_URL: ${deployedUrl}`);
    
    // Validate port before using it
    if (typeof port !== 'number' || port <= 0) {
      throw new Error(`Invalid port configuration: ${port}. Port must be a positive number.`);
    }
    
    // Connect to database first
    await connectDB();
    
    // Middleware - Support multiple CORS origins
    const allowedOrigins = corsOrigin.split(',').map(origin => origin.trim());
    
    app.use(cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    }));
    app.use(express.json());

    // Request logging middleware
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
      next();
    });

    // Routes with error handling
    try {
      app.use('/api/users', require('./routes/users'));
      app.use('/api/transactions', require('./routes/transactions'));
      app.use('/api/expenses', require('./routes/expenses'));
      app.use('/api/investments', require('./routes/investments'));
      console.log('✅ All routes loaded successfully');
    } catch (routeError) {
      console.error('❌ Error loading routes:', routeError.message);
      throw routeError;
    }

    // Test route
    app.get('/api/test', (req, res) => {
      res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        message: 'E-Finance API is running',
        database: 'Connected'
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });

    // Handle 404 routes
    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    // Start server
    const server = app.listen(port, () => {
      const serverUrl = process.env.NODE_ENV === 'production' ? deployedUrl : `http://localhost:${port}`;
      console.log(`✅ Server Started at ${serverUrl}`);
      console.log(`🔍 Health check: ${serverUrl}/health`);
      console.log(`🧪 Test endpoint: ${serverUrl}/api/test`);
      console.log(`📊 Available routes:`);
      console.log(`   - GET/POST ${serverUrl}/api/users`);
      console.log(`   - GET/POST ${serverUrl}/api/transactions`);
      console.log(`   - GET/POST ${serverUrl}/api/expenses`);
      console.log(`   - GET/POST ${serverUrl}/api/investments`);
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EACCES') {
        console.error(`❌ Permission denied: Cannot bind to port ${port}. Try using a different port or run with appropriate permissions.`);
      } else if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use. Please use a different port.`);
      } else {
        console.error(`❌ Server error:`, error);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();