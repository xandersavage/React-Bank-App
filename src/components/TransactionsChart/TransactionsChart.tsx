import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, Title } from '@mantine/core';

interface TransactionsChartProps {
  data: Array<{ date: string; transactions: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
        <p className="font-semibold">{label}</p>
        <p className="text-red-600">{`${payload[0].value} Transactions`}</p>
      </div>
    );
  }
  return null;
};

export const TransactionsChart = ({ data }: TransactionsChartProps) => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" mt="md" withBorder>
        <Title order={3} mt="md" mb="xs">
          Number of Transactions Over Time
        </Title>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="transactions"
              stroke="#E63946"
              strokeWidth={2}
              dot={{ r: 4, fill: '#E63946' }}
              activeDot={{ r: 6, fill: '#E63946' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};
