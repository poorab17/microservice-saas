module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "championship",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  // Add more configurations for other environments if needed (e.g., production, test).
};
