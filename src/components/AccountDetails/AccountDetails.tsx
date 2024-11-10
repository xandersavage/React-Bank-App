import React, { useState } from 'react';
import { Table, ScrollArea, Group, Stack, Text, Card, Badge, ThemeIcon, Button } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconReceipt } from '@tabler/icons-react';
import classes from '../../css/TableScrollArea.module.css'; // You'll need to create this CSS module

const mockTransactions = [
  { id: 1, date: '2023-09-15', description: 'Grocery Store', amount: -120.50 },
  { id: 2, date: '2023-09-14', description: 'Salary Deposit', amount: 3000.00 },
  { id: 3, date: '2023-09-13', description: 'Electric Bill', amount: -85.20 },
  // Add more transactions here to test scrolling
];

export default function AccountDetails({ account }) {
  const [scrolled, setScrolled] = useState(false);

  const rows = mockTransactions.map((transaction) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>{transaction.date}</Table.Td>
      <Table.Td>{transaction.description}</Table.Td>
      <Table.Td>
        <Group spacing="xs">
          <ThemeIcon 
            color={transaction.amount >= 0 ? 'green' : 'red'} 
            size={24} 
            radius="xl"
          >
            {transaction.amount >= 0 ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
          </ThemeIcon>
          <Text weight={500} color={transaction.amount >= 0 ? 'green' : 'red'}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </Text>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack spacing="xl">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" mb="xs">
          <Text size="xl" weight={500}>{account.name}</Text>
          <Badge color={account.balance >= 0 ? 'green' : 'red'} size="lg">
            ${account.balance.toFixed(2)}
          </Badge>
        </Group>
        <Text size="sm" color="dimmed">Account Number: {account.number}</Text>
        {account.availableCredit !== null && (
          <Text size="sm" mt="md">Available Credit: ${account.availableCredit.toFixed(2)}</Text>
        )}
      </Card>
      
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text size="xl" weight={500} mb="md">Recent Transactions</Text>
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
          <Table miw={700}>
            <Table.Thead className={classes.header} style={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
      
      <Group position="apart" mt="xl">
        <Button leftIcon={<IconReceipt size={14} />} variant="filled">View Statement</Button>
        <Button variant="outline">Download Transactions</Button>
      </Group>
    </Stack>
  );
}