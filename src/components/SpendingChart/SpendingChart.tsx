import { useState} from 'react';
import { Card, Title, Grid, Select, Text } from '@mantine/core';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
// import { useState } from 'react';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function SpendingChart({ transactions }) {
  const [timeRange, setTimeRange] = useState('month');

  // Function to group transactions by category
  const getCategoryData = () => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      if (transaction.amount < 0) { // Only include expenses
        acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    }, {});
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  // Function to group transactions by day/week/month
  const getTimeSeriesData = () => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = sorted.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      let key;
      if (timeRange === 'week') {
        key = `Week ${Math.ceil((date.getDate() + date.getDay()) / 7)}`;
      } else if (timeRange === 'month') {
        key = date.toLocaleString('default', { month: 'short' });
      } else {
        key = transaction.date;
      }
      if (!acc[key]) {
        acc[key] = { date: key, income: 0, expenses: 0 };
      }
      if (transaction.amount > 0) {
        acc[key].income += transaction.amount;
      } else {
        acc[key].expenses += Math.abs(transaction.amount);
      }
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  // Function to get top 5 expenses
  const getTopExpenses = () => {
    return transactions
      .filter(t => t.amount < 0)
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
      .slice(0, 5)
      .map(t => ({ name: t.description, value: Math.abs(t.amount) }));
  };

  const categoryData = getCategoryData();
  const timeSeriesData = getTimeSeriesData();
  const topExpensesData = getTopExpenses();

  return (
    <Grid>
      <Grid.Col span={12}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">Spending Overview</Title>
          <Select
            label="Time Range"
            value={timeRange}
            onChange={setTimeRange}
            data={[
              { value: 'day', label: 'Daily' },
              { value: 'week', label: 'Weekly' },
              { value: 'month', label: 'Monthly' },
            ]}
            mb="md"
          />
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="expenses" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </Grid.Col>
      
      <Grid.Col span={{ base: 12, sm: 12, xs: 12, lg: 6}}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">Spending by Category</Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Grid.Col>
      
      <Grid.Col span={{ base: 12, sm: 12, xs: 12, lg: 6}}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">Top 5 Expenses</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topExpensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {topExpensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid.Col>
      
      <Grid.Col span={12}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">Income vs Expenses Trend</Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid.Col>
    </Grid>
  );
}