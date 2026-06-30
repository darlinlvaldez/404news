"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Lun", views: 120 },
  { day: "Mar", views: 180 },
  { day: "Mié", views: 160 },
  { day: "Jue", views: 240 },
  { day: "Vie", views: 210 },
  { day: "Sáb", views: 310 },
  { day: "Dom", views: 280 },
];

export default function ViewsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

        <XAxis
          dataKey="day"
          stroke="#9CA3AF"
        />

        <YAxis
          stroke="#9CA3AF"
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="views"
          stroke="#22c55e"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}