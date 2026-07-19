// scripts/migrate.js
// Applies db/schema.sql against DATABASE_URL. Safe to re-run (uses
// `create table if not exists` / `create index if not exists`).
//
// Usage:
//   node scripts/migrate.js

const fs = require('fs');
const path = require('path');
const { getPool } = require('../lib/db');

async function main() {
  const sqlPath = path.join(__dirname, '..', 'db', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const pool = getPool();
  try {
    await pool.query(sql);
    console.log('✅ Migration applied successfully.');
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
