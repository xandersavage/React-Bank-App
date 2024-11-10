/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader, Text, Title } from '@mantine/core';
import { BalanceOverviewCards } from '@/components/BalanceOverviewCards/BalanceOverviewCards';
import { AccountBalanceChart } from '../components/AccountBalanceChart/AccountBalanceChart';
import { CompareChart } from '../components/CompareChart/CompareChart';
import { TransactionsChart } from '../components/TransactionsChart/TransactionsChart';
import ApiService from '../services/api';

interface DashboardData {
  overview: {
    userName: string;
    currentBalance: number;
    savings: number;
    monthlySpending: number;
    currentBalanceDiff: number;
    savingsDiff: number;
    monthlySpendingDiff: number;
  };
  balanceHistory: Array<{ date: string; balance: number }>;
  transactionHistory: Array<{ date: string; transactions: number }>;
  comparisonData: Array<{ date: string; deposits: number; withdrawals: number }>;
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await ApiService.getDashboardOverview();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Implement proper error handling here
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!dashboardData) {
    return <Text>No data available</Text>;
  }

  return (
    <>
      <Title order={2}>Dashboard</Title>
      <Text>Here is an overview of your account</Text>
      <BalanceOverviewCards data={dashboardData.overview} />
      <AccountBalanceChart data={dashboardData.balanceHistory} />
      <TransactionsChart data={dashboardData.transactionHistory} />
      <CompareChart data={dashboardData.comparisonData} />
    </>
  );
}
