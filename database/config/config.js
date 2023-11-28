const config = require('./config.json');

module.exports = {
  development: {
    username: config.psql.username,
    password: config.psql.secret,
    database: config.psql.database,
    port: config.psql.port || 5432,
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
    timezone: 'utc',
    // logging: false,
    pool: {
      max: 50,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
    logging: false,
  },
};
