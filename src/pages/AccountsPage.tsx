import React, { useState } from 'react';
import { Container, Grid, Modal, Title, Paper, Transition } from '@mantine/core';
import AccountCard from '../components/AccountCard/AccountCard';
import AccountDetails from '../components/AccountDetails/AccountDetails';

const mockAccounts = [
  { id: 1, name: 'Checking', number: '1234', balance: 5000, availableCredit: null },
  { id: 2, name: 'Savings', number: '5678', balance: 10000, availableCredit: null },
  { id: 3, name: 'Credit Card', number: '9012', balance: -1500, availableCredit: 5000 },
];

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
  };

  const handleCloseModal = () => {
    setSelectedAccount(null);
  };

  return (
    <Container size="xl">
      <Title order={1} mb="xl">Your Accounts</Title>
      <Grid>
        {mockAccounts.map((account) => (
          <Grid.Col key={account.id} xs={12} sm={6} md={4}>
            <AccountCard
              account={account}
              onClick={() => handleAccountClick(account)}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Modal
        opened={!!selectedAccount}
        onClose={handleCloseModal}
        title={selectedAccount?.name}
        size="lg"
        padding="xl"
        radius="md"
        overlayOpacity={0.55}
        overlayBlur={3}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <Paper shadow="xs" p="md">
          {selectedAccount && <AccountDetails account={selectedAccount} />}
        </Paper>
      </Modal>
    </Container>
  );
}