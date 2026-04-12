const { Pool } = require('pg');

// 使用新端口测试
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'atomcap_user',
  password: 'atomcap_password_2024',
  database: 'atomcap',
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ 数据库连接成功！');
    console.log('当前时间:', result.rows[0].now);
    console.log('当前用户:', result.rows[0].current_user);
    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    console.error('错误代码:', error.code);
    process.exit(1);
  }
}

testConnection();
