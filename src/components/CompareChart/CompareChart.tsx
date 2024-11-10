import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, Title } from '@mantine/core';

interface CompareChartProps {
  data: Array<{ date: string; deposits: number; withdrawals: number }>;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
        <p className="font-semibold">{label}</p>
        <p className="text-green-600">Deposits: {formatCurrency(payload[0].value)}</p>
        <p className="text-red-600">Withdrawals: {formatCurrency(payload[1].value)}</p>
      </div>
    );
  }
  return null;
};

export const CompareChart = ({ data }: CompareChartProps) => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" mt="md" withBorder>
        <Title order={3} mt="md" mb="xs">
          Deposits vs Withdrawals Over Time
        </Title>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888888" />
            <YAxis stroke="#888888" tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" iconType="circle" />

            {/* Bars for Deposits */}
            <Bar
              dataKey="deposits"
              fill="#38B2AC" // Teal color for deposits
              barSize={30}
            />

            {/* Bars for Withdrawals */}
            <Bar
              dataKey="withdrawals"
              fill="#E53E3E" // Red color for withdrawals
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};
