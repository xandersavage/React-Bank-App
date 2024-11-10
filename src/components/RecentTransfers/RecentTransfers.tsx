import React from 'react';
import { Paper, Title, Text, Stack, Group, ActionIcon } from '@mantine/core';
import { IconRepeat } from '@tabler/icons-react';

const mockRecentTransfers = [
  { id: 1, to: 'John Doe', amount: 500, date: '2023-09-15' },
  { id: 2, to: 'Savings Account', amount: 1000, date: '2023-09-10' },
];

export default function RecentTransfers() {
  return (
    <Paper shadow="xs" p="md" mt="xl">
      <Title order={3} mb="md">Recent Transfers</Title>
      <Stack spacing="sm">
        {mockRecentTransfers.map((transfer) => (
          <Group key={transfer.id} position="apart">
            <div>
              <Text size="sm">{transfer.to}</Text>
              <Text size="xs" color="dimmed">{transfer.date}</Text>
            </div>
            <Group spacing="xs">
              <Text weight={500}>${transfer.amount}</Text>
              <ActionIcon size="sm" color="blue" variant="light">
                <IconRepeat size={14} />
              </ActionIcon>
            </Group>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}