import knex from "knex";
import bookshelf from "bookshelf";

const knexConfig: knex.Config = require("../../knexfile")

const knexInstance = knex(knexConfig);
const bookshelfInstance = bookshelf(knexInstance);

knexInstance.on('start', () => {
    console.log('Connected to the database!');
});

knexInstance.raw('SELECT 1')
    .then(() => {
        console.log('Example query executed successfully!');
    })
    .catch((error) => {
        console.error('Error executing example query:', error);
    });

export default bookshelfInstance;
