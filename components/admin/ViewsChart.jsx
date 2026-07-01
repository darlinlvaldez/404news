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

export default function ViewsChart({data}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
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