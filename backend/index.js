const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// ✅ Test Endpoint
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

// ✅ Stats Endpoint
app.get("/stats", async (req, res) => {
  try {
    const totalInvoices = await pool.query(`SELECT COUNT(*) AS invoice_count FROM invoices;`);
    const vendorCount = await pool.query(`SELECT COUNT(*) AS vendor_count FROM vendors;`);
    const latestInvoiceDate = await pool.query(`SELECT MAX(invoice_date) AS latest_date FROM invoices;`);

    res.json({
      total_invoices: totalInvoices.rows[0].invoice_count,
      total_vendors: vendorCount.rows[0].vendor_count,
      latest_invoice_date: latestInvoiceDate.rows[0].latest_date,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// ✅ Get all invoices (for dashboard table)
app.get("/invoices", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        invoices.id,
        invoices.invoice_number,
        invoices.invoice_date,
        vendors.name AS vendor_name
      FROM invoices
      JOIN vendors ON invoices.vendor_id = vendors.id
      ORDER BY invoices.invoice_date DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// ✅ Top 10 Vendors by Invoice Count
app.get("/vendors/top10", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        vendors.name AS vendor_name,
        COUNT(invoices.id) AS invoice_count
      FROM invoices
      JOIN vendors ON invoices.vendor_id = vendors.id
      GROUP BY vendors.name
      ORDER BY invoice_count DESC
      LIMIT 10;
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API server running on port ${PORT}`));
