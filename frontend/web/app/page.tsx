"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import DashboardCharts from "./components/DashboardCharts";
import InvoicesTable from "./components/InvoicesTable";
import { useEffect, useState } from "react";


export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;
  const { theme, setTheme } = useTheme();


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Total Invoices</p>
          <p className="text-2xl font-semibold">{stats.total_invoices}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Total Vendors</p>
          <p className="text-2xl font-semibold">{stats.total_vendors}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Latest Invoice Date</p>
          <p className="text-2xl font-semibold">
            {new Date(stats.latest_invoice_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    {/* KPI row - place below DashboardCharts in page.tsx */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center text-sm text-gray-600">
  <div className="bg-white p-3 rounded shadow">
    <div className="text-xs">Avg. Invoice Value</div>
    <div className="text-xl font-semibold">₹{Math.round((stats?.avg_invoice_value || 1450)).toLocaleString()}</div>
  </div>

  <div className="bg-white p-3 rounded shadow">
    <div className="text-xs">Most Frequent Vendor</div>
    <div className="text-xl font-semibold">{stats?.most_frequent_vendor || "Vendor A"}</div>
  </div>

  <div className="bg-white p-3 rounded shadow">
    <div className="text-xs">Pending Invoices</div>
    <div className="text-xl font-semibold text-yellow-600">{stats?.pending_invoices || 12}</div>
  </div>
</div>
<div className="flex justify-between items-center">
  <h1 className="text-2xl font-semibold">Dashboard</h1>
  <button
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    className="p-2 rounded bg-gray-200 dark:bg-gray-700"
  >
    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
  </button>
</div>


      <DashboardCharts />
      <InvoicesTable />
    </div>

  );
}
