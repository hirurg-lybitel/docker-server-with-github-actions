module.exports = {
  apps: [
    {
      name: 'simple-server',
      script: 'dist/main.js',
      watch: ['dist'],
      env_production: {
        NODE_ENV: "production"
     },
      env_development: {
        NODE_ENV: "development",
      }
    }
  ]
}
