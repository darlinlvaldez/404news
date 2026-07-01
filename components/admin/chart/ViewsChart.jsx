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
          tickFormatter={(value) =>
          new Date(value).toLocaleDateString("es-DO", {
            weekday: "short",
            day: "numeric",
          })
        }
        />

        <YAxis
          stroke="#9CA3AF"
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
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString("es-DO", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          }
        />

        <Line
          type="monotone"
          name="Vistas"
          dataKey="views"
          stroke="#22c55e"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}