// Load environment variables first
require('dotenv').config();

// Debug script to check environment variables
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('Raw process.env.PORT:', process.env.PORT);
console.log('Type of process.env.PORT:', typeof process.env.PORT);
console.log('Parsed PORT:', parseInt(process.env.PORT, 10));
console.log('Is PORT NaN?', isNaN(parseInt(process.env.PORT, 10)));
console.log('');

console.log('Other relevant environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DEPLOYED_URL:', process.env.DEPLOYED_URL);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('');

console.log('All environment variables containing "PORT":');
Object.keys(process.env)
  .filter(key => key.toLowerCase().includes('port'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
  });

console.log('');
console.log('All environment variables containing "URL":');
Object.keys(process.env)
  .filter(key => key.toLowerCase().includes('url'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
  });
