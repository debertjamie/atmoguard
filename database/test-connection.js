require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('Mencoba konek ke database...');
    await client.connect();
    console.log('Berhasil konek ke database Supabase');

    // Cek tabel yang ada
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('\nTabel yang ditemukan:');
    res.rows.forEach(row => console.log(' -', row.table_name));

  } catch (err) {
    console.error('Gagal konek ke database:');
    console.error(err.message);
  } finally {
    await client.end();
    console.log('\nKoneksi ditutup.');
  }
}

testConnection();