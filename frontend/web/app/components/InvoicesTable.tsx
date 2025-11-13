"use client";
import { useState } from "react";

export default function InvoicesTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const invoices = [
    { id: 1, vendor: "Musterfirma Müller", invoice: "INV-001", amount: 2500, date: "2025-11-04", status: "Paid" },
    { id: 2, vendor: "TechSupplies GmbH", invoice: "INV-002", amount: 1800, date: "2025-11-06", status: "Pending" },
    { id: 3, vendor: "AlphaSoft AG", invoice: "INV-003", amount: 3200, date: "2025-11-02", status: "Overdue" },
    { id: 4, vendor: "MediCare Ltd", invoice: "INV-004", amount: 2900, date: "2025-10-30", status: "Paid" },
  ];

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search vendor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 border-b">Vendor</th>
              <th className="py-2 px-4 border-b">Invoice No.</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4 border-b">{inv.vendor}</td>
                  <td className="py-2 px-4 border-b">{inv.invoice}</td>
                  <td className="py-2 px-4 border-b">₹{inv.amount.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{inv.date}</td>
                  <td
                    className={`py-2 px-4 border-b font-medium ${
                      inv.status === "Paid"
                        ? "text-green-600"
                        : inv.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {inv.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-500">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
