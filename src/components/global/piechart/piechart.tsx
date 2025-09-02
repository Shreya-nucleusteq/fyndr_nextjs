"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

interface ChartData {
  name: string;
  visitors: number;
}

interface PieChartProps {
  chartData: ChartData[];
  colors?: string[];
  height?: number;
  width?:number;
}

const PieChartSection: React.FC<PieChartProps> = ({ chartData, colors = ["#5196E2", "#999999", "#EAF2FC"] ,width = 200 , height =200}) => {
     const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
  return (

      <PieChart width={width} height={height}>
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
         
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
   
  );
};

export default PieChartSection;
