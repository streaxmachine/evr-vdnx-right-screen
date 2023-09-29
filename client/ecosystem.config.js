module.exports = {
  apps: [
    {
      name: 'reclaim-your-dna',
      script: 'yarn start',
      max_restarts: 2,
      min_uptime: '10s',
      restart_delay: 10000,
      max_memory_restart: '150M',
      env: {
        PORT: '3038',
      },
    },
  ],
};
