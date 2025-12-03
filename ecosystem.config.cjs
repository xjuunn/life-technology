module.exports = {
  apps: [
    {
      name: 'life-tech-frontend',
      script: '/www/wwwroot/lifeTechnology/fond/.output/server/index.mjs',
      interpreter: '/root/.nvm/versions/node/v22.21.1/bin/node',
      watch: false,
      env: {
        NITRO_PORT: 3123,
        NITRO_HOST: '0.0.0.0',
        NODE_ENV: 'development',
        VITE_BACKBASE_URL: 'https://lifetv.chat/api/'
      },
      env_production: {
        NITRO_PORT: 3123,
        NITRO_HOST: '0.0.0.0',
        NODE_ENV: 'production',
        VITE_BACKBASE_URL: 'https://lifetv.chat/api/'
      }
    }
  ]
};
