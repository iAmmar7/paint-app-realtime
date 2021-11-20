module.exports = {
  apps: [
    {
      name: 'paint-app-realtime',
      script: 'index.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
