import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'colonel09',
  host: 'localhost',
  port: 5432,
  database: 'automart',
});

export default pool;
