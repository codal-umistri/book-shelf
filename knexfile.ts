import Knex = require('knex');
import bookshelf = require('bookshelf');
import path from 'path';
  

  module.exports = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Terabaap@12345',
      database: 'users',
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'migrations'),
      },
  };