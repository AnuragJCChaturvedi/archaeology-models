module.exports = (config) => {
  return `postgres://${config.username}:${config.password}@localhost:${config.port}/${config.database}`;
};
