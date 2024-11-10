import React from 'react';
import { Modal, Table, Text, Badge, Group } from '@mantine/core';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

const mockTransferHistory = [
  { id: 1, date: '2023-09-15', from: 'Checking Account', to: 'John Doe', amount: 500, type: 'outgoing' },
  { id: 2, date: '2023-09-10', from: 'Checking Account', to: 'Savings Account', amount: 1000, type: 'internal' },
  { id: 3, date: '2023-09-05', from: 'Jane Smith', to: 'Checking Account', amount: 250, type: 'incoming' },
  // Add more mock data as needed
];

export default function TransferHistoryModal({ isOpen, onClose }) {
  const rows = mockTransferHistory.map((transfer) => (
    <tr key={transfer.id}>
      <td>{transfer.date}</td>
      <td>{transfer.from}</td>
      <td>{transfer.to}</td>
      <td>
        <Group spacing="xs">
          {transfer.type === 'outgoing' && <IconArrowUp size={14} color="red" />}
          {transfer.type === 'incoming' && <IconArrowDown size={14} color="green" />}
          {transfer.type === 'internal' && <IconArrowUp size={14} color="blue" />}
          <Text weight={500} color={transfer.type === 'incoming' ? 'green' : (transfer.type === 'outgoing' ? 'red' : 'blue')}>
            ${transfer.amount.toFixed(2)}
          </Text>
        </Group>
      </td>
      <td>
        <Badge color={transfer.type === 'incoming' ? 'green' : (transfer.type === 'outgoing' ? 'red' : 'blue')}>
          {transfer.type}
        </Badge>
      </td>
    </tr>
  ));

  return (
    <Modal opened={isOpen} onClose={onClose} title="Transfer History" size="xl">
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Modal>
  );
}