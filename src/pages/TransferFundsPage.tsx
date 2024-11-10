import React, { useState } from 'react';
import { Container, Grid, Paper, Title, Group, Button } from '@mantine/core';
import { IconExchange, IconHistory } from '@tabler/icons-react';
import TransferForm from '../components/TransferForm/TransferForm';
import RecentTransfers from '../components/RecentTransfers/RecentTransfers';
import TransferLimits from '../components/TransferLimits/TransferLimits';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import TransferHistoryModal from '../components/TransferHistoryModal/TransferHistoryModal';

const mockAccounts = [
  { id: 1, name: 'Checking Account', balance: 5000 },
  { id: 2, name: 'Savings Account', balance: 10000 },
];

const mockBeneficiaries = [
  { id: 1, name: 'John Doe', accountNumber: '1234567890' },
  { id: 2, name: 'Jane Smith', accountNumber: '0987654321' },
];

export default function TransferFundsPage() {
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    note: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTransferHistory, setShowTransferHistory] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState(mockBeneficiaries);

  const handleTransferSubmit = (data) => {
    setTransferData(data);
    setShowConfirmation(true);
  };

  const handleConfirmTransfer = () => {
    // Process the transfer
    console.log('Transfer confirmed:', transferData);
    setShowConfirmation(false);
    // Reset form or show success message
  };

  const handleAddBeneficiary = (newBeneficiary) => {
    setBeneficiaries([...beneficiaries, { id: beneficiaries.length + 1, ...newBeneficiary }]);
  };

  return (
    <Container size="md">
      <Title order={1} mb="xl" align="center">Transfer Funds</Title>
      <Paper shadow="xs" p="xl" mb="xl">
        <Grid>
          <Grid.Col md={8}>
            <TransferForm
              accounts={mockAccounts}
              beneficiaries={beneficiaries}
              onSubmit={handleTransferSubmit}
              onAddBeneficiary={handleAddBeneficiary}
            />
          </Grid.Col>
          <Grid.Col md={4}>
            <TransferLimits />
            <RecentTransfers />
          </Grid.Col>
        </Grid>
      </Paper>
      <Group position="center" mt="xl">
        <Button leftIcon={<IconExchange size={14} />} variant="filled" color="blue">
          New Transfer
        </Button>
        <Button 
          leftIcon={<IconHistory size={14} />} 
          variant="outline"
          onClick={() => setShowTransferHistory(true)}
        >
          Transfer History
        </Button>
      </Group>
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmTransfer}
        transferData={transferData}
      />
      <TransferHistoryModal
        isOpen={showTransferHistory}
        onClose={() => setShowTransferHistory(false)}
      />
    </Container>
  );
}