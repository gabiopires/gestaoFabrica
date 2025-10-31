import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'db_fabrica',
  waitForConnections: true,
  connectionLimit: 50,
  connectTimeout: 10000,
  timezone: 'Z', // ou +00:00 ou 'America/Sao_Paulo' se for o caso
});

export default pool;
