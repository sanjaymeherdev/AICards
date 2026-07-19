// lib/db.js — shared Postgres pool for Railway Postgres.
//
// Railway injects DATABASE_URL automatically once a Postgres plugin is
// attached to the project. This file just wraps a singleton `pg` Pool
// around it so every route can `const { getPool } = require('./lib/db')`
// without opening a new connection each time.

const { Pool } = require('pg');

let pool = null;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Railway's managed Postgres sits behind a proxy that uses a
  // self-signed cert internally; rejectUnauthorized:false avoids cert
  // validation failures without disabling encryption. Local Postgres
  // (sslmode=disable in the URL) skips SSL entirely.
  const useSSL = !/sslmode=disable/.test(connectionString);

  pool = new Pool({
    connectionString,
    ssl: useSSL ? { rejectUnauthorized: false } : false,
  });

  pool.on('error', (err) => {
    console.error('Unexpected Postgres pool error:', err);
  });

  return pool;
}

module.exports = { getPool };
