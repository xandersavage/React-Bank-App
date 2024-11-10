import React from 'react';
import { Card, Text, Button, Group, Stack } from '@mantine/core';

export default function AccountCard({ account, onClick }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Text size="xl" weight={500}>{account.name}</Text>
        <Text size="sm" color="dimmed">Account Number: {account.number}</Text>
        <Text size="lg" weight={500}>Balance: ${account.balance.toFixed(2)}</Text>
        {account.availableCredit !== null && (
          <Text size="sm">Available Credit: ${account.availableCredit.toFixed(2)}</Text>
        )}
        <Group position="apart" mt="md">
          <Button variant="light" onClick={onClick}>View Details</Button>
          <Button variant="outline">Manage Account</Button>
        </Group>
      </Stack>
    </Card>
  );
}