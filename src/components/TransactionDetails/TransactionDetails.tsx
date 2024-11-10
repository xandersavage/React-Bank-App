import React from 'react';
import { Text, Group, Stack, Badge } from '@mantine/core';

export default function TransactionDetails({ transaction }) {
  return (
    <Stack>
      <Group position="apart">
        <Text size="xl" weight={500}>{transaction.description}</Text>
        <Badge color={transaction.amount >= 0 ? 'green' : 'red'} size="lg">
          ${Math.abs(transaction.amount).toFixed(2)}
        </Badge>
      </Group>
      <Text>Date: {transaction.date}</Text>
      <Text>Category: {transaction.category}</Text>
      <Text>Type: {transaction.type}</Text>
      {/* Add more details as needed */}
    </Stack>
  );
}