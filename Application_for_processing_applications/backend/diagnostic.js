// test-pg.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgresql://postgres.ghgmvduyuzfpnelhsfpb:P8GH4MB3IBkAq6kA@aws-0-eu-west-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Успешное подключение к базе!');
    const res = await client.query('SELECT NOW()');
    console.log('🕒 Время на сервере:', res.rows[0]);
    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ Ошибка подключения:', err.message);
  }
})();
