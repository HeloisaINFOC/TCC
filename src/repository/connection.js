import mysql from 'mysql2/promise'

const con = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bancoimpulsa',
  password: '0483364'
})

console.log('Conectou com MYSQL!');

export { con };
