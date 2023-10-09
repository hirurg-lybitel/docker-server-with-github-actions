module.exports = {
  apps: [
    {
      name: 'simple-server',
      script: 'dist/main.js',
      watch: ['dist'],
      env_production: {
        NODE_ENV: "production",
        HOST: '0.0.0.0'
     },
      env_development: {
        NODE_ENV: "development",
      }
    }
  ]
}
