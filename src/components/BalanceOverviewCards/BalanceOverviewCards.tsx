import React from 'react';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import classes from '../../css/StatGridIcons.module.css';

interface BalanceOverviewCardsProps {
  data: {
    currentBalance: number;
    savings: number;
    monthlySpending: number;
    currentBalanceDiff: number;
    savingsDiff: number;
    monthlySpendingDiff: number;
  };
}

export function BalanceOverviewCards({ data }: BalanceOverviewCardsProps) {
  const stats = [
    {
      title: 'Current Balance',
      value: `$${data.currentBalance.toFixed(2)}`,
      diff: data.currentBalanceDiff,
    },
    { title: 'Savings', value: `$${data.savings.toFixed(2)}`, diff: data.savingsDiff },
    {
      title: 'Monthly Spending',
      value: `$${data.monthlySpending.toFixed(2)}`,
      diff: data.monthlySpendingDiff,
    },
  ];

  const items = stats.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {Math.abs(stat.diff)}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{items}</SimpleGrid>
    </div>
  );
}
