"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";

const COLORS = [
  "#3B82F6", 
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function CategoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
    >
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

        <XAxis
          type="number"
          stroke="#9CA3AF"
        />

        <YAxis
          dataKey="name"
          type="category"
          stroke="#9CA3AF"
          width={115}
        />

        <Tooltip 
          contentStyle={{
            backgroundColor: "#111827",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
          }}
          labelStyle={{
            color: "#D1D5DB",
            fontWeight: 600,
          }}
          itemStyle={{
            color: "#22C55E",
          }}
        />

        <Bar
          dataKey="news_count"
          name="Cantidad de Noticias"
          radius={[0, 4, 4, 0]}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}