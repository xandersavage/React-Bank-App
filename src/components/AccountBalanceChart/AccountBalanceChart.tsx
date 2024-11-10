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

interface AccountBalanceChartProps {
  data: Array<{ date: string; balance: number }>;
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
        <p className="text-blue-600">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export const AccountBalanceChart = ({ data }: AccountBalanceChartProps) => {
  return (
    <Card shadow="sm" p="lg" radius="md" mt="md" withBorder>
      <Title order={3} mb="xs">
        Account Balance Over Time
      </Title>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888888" />
          <YAxis stroke="#888888" tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ r: 4, fill: '#4F46E5' }}
            activeDot={{ r: 6, fill: '#4F46E5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
