"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function DashboardCharts() {
  const invoiceTrend = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 18000 },
    { month: "Mar", value: 22000 },
    { month: "Apr", value: 19000 },
    { month: "May", value: 27000 },
    { month: "Jun", value: 25000 },
  ];

  const vendorSpend = [
    { name: "Vendor A", spend: 40000 },
    { name: "Vendor B", spend: 32000 },
    { name: "Vendor C", spend: 29000 },
    { name: "Vendor D", spend: 26000 },
  ];

  const categorySpend = [
    { name: "IT", value: 35 },
    { name: "Office", value: 25 },
    { name: "Supplies", value: 20 },
    { name: "Logistics", value: 20 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
      {/* Line Chart */}
      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Invoice Value Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={invoiceTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Top Vendors by Spend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={vendorSpend}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="spend" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart */}
      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Spend by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categorySpend} dataKey="value" nameKey="name" outerRadius={90} fill="#f59e0b" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
