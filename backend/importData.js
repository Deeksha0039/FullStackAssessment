const fs = require("fs");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

async function importData() {
  const raw = fs.readFileSync("./Analytics_Test_Data.json");
  const data = JSON.parse(raw);

  for (const item of data) {

    const vendor = item?.extractedData?.llmData?.vendor?.value;
    const invoice = item?.extractedData?.llmData?.invoice?.value;
    const payment = item?.extractedData?.llmData?.payment?.value;

    if (!vendor || !invoice) continue;

    const vendorResult = await pool.query(
      `INSERT INTO vendors (name, address, tax_id)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [
        vendor.vendorName?.value || null,
        vendor.vendorAddress?.value || null,
        vendor.vendorTaxId?.value || null
      ]
    );

    const vendorId = vendorResult.rows[0].id;

    const invoiceResult = await pool.query(
      `INSERT INTO invoices (invoice_number, vendor_id, invoice_date)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [
        invoice.invoiceId?.value || null,
        vendorId,
        invoice.invoiceDate?.value || null
      ]
    );

    const invoiceId = invoiceResult.rows[0].id;

    if (payment?.bankAccountNumber?.value) {
      await pool.query(
        `INSERT INTO payments (invoice_id, bank_account_number)
         VALUES ($1, $2)`,
        [invoiceId, payment.bankAccountNumber.value]
      );
    }
  }

  console.log("✅ Import Done — Data Loaded Successfully");
  pool.end();
}

importData();
