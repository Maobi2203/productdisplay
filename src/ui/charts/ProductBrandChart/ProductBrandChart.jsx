import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProductBrandChart({ products }) {
  // Count products per brand
  const chartData = Object.values(
    products.reduce((acc, product) => {
      const brand = product.brand || "Unknown";
      if (!acc[brand]) acc[brand] = { brand, count: 0 };
      acc[brand].count += 1;
      return acc;
    }, {}),
  );

  return (
    <div style={{ width: "100%", height: 250, marginBottom: "2rem" }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductBrandChart;
