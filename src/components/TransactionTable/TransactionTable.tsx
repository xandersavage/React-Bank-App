import React, { useState } from 'react';
import { Table, ScrollArea, Group, Text, ThemeIcon } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from '../../css/TableScrollArea.module.css'; 

export default function TransactionTable({ transactions, onTransactionClick }) {
  const [scrolled, setScrolled] = useState(false);

  const rows = transactions.map((transaction) => (
    <Table.Tr key={transaction.id} onClick={() => onTransactionClick(transaction)} style={{ cursor: 'pointer' }}>
      <Table.Td>{transaction.date}</Table.Td>
      <Table.Td>{transaction.description}</Table.Td>
      <Table.Td>{transaction.category}</Table.Td>
      <Table.Td>
        <Group spacing="xs">
          <ThemeIcon 
            color={transaction.amount >= 0 ? 'green' : 'red'} 
            size={24} 
            radius="xl"
          >
            {transaction.amount >= 0 ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
          </ThemeIcon>
          <Text weight={500} c={transaction.amount >= 0 ? 'green' : 'red'}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </Text>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={classes.header} style={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}