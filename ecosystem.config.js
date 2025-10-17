module.exports = {
  apps: [
    {
      name: 'feedback-form',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3005
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      
      // Advanced PM2 features
      exec_mode: 'fork',
      min_uptime: '10s',
      max_restarts: 10,
      
      // Health monitoring
      kill_timeout: 5000,
      listen_timeout: 8000,
      
      // Environment specific settings
      merge_logs: true,
      
      // Post deployment commands (optional)
      // post_update: ['npm install', 'npm run build']
    }
  ],

  // Deployment configuration (optional)
  deploy: {
    production: {
      user: 'root',
      host: '127.0.0.1',
      ref: 'origin/main',
      repo: 'git@github.com:fs0711/feedback-form.git',
      path: '/home/sapfeedback',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};