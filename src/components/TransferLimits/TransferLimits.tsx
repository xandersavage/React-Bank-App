import React from 'react';
import { Paper, Title, Text, Progress, Stack } from '@mantine/core';

export default function TransferLimits() {
  const dailyLimit = 5000;
  const usedToday = 2000;
  const percentage = (usedToday / dailyLimit) * 100;

  return (
    <Paper shadow="xs" p="md">
      <Title order={3} mb="md">Transfer Limits</Title>
      <Stack spacing="xs">
        <Text size="sm">Daily Limit: ${dailyLimit}</Text>
        <Text size="sm">Used Today: ${usedToday}</Text>
        <Text size="sm">Available: ${dailyLimit - usedToday}</Text>
        <Progress
          value={percentage}
          label={`${percentage.toFixed(0)}%`}
          size="xl"
          radius="xl"
        />
      </Stack>
    </Paper>
  );
}