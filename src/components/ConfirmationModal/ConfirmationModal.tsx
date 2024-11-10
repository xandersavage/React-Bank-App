import React from 'react';
import { Modal, Button, Group, Text, Stack } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, transferData }) {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Transfer" centered>
      <Stack spacing="md">
        <Text>Please confirm the following transfer details:</Text>
        <Text><strong>From:</strong> {transferData.fromAccount}</Text>
        <Text><strong>To:</strong> {transferData.toAccount}</Text>
        <Text><strong>Amount:</strong> ${transferData.amount}</Text>
        {transferData.note && <Text><strong>Note:</strong> {transferData.note}</Text>}
      </Stack>
      <Group position="apart" mt="xl">
        <Button onClick={onClose} color="red" leftIcon={<IconX size={14} />}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="green" leftIcon={<IconCheck size={14} />}>
          Confirm Transfer
        </Button>
      </Group>
    </Modal>
  );
}