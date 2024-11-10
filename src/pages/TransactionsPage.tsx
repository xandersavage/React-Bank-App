import React, { useState } from 'react';
import { Container, Grid, Title, Card, Group, Select, TextInput, Button, Modal } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import TransactionTable from '../components/TransactionTable/TransactionTable';
import TransactionDetails from '../components/TransactionDetails/TransactionDetails';
import SpendingChart from '../components/SpendingChart/SpendingChart';

const mockTransactions = [
  { id: 1, date: '2023-09-15', description: 'Grocery Store', type: 'debit', category: 'Groceries', amount: -120.50 },
  { id: 2, date: '2023-09-14', description: 'Salary Deposit', type: 'credit', category: 'Income', amount: 3000.00 },
  { id: 3, date: '2023-09-13', description: 'Electric Bill', type: 'debit', category: 'Utilities', amount: -85.20 },
  { id: 4, date: '2023-09-12', description: 'Restaurant', type: 'debit', category: 'Dining', amount: -65.00 },
  { id: 5, date: '2023-09-11', description: 'Gas Station', type: 'debit', category: 'Transportation', amount: -40.00 },
  { id: 6, date: '2023-09-10', description: 'Movie Tickets', type: 'debit', category: 'Entertainment', amount: -30.00 },
  { id: 7, date: '2023-09-09', description: 'Online Shopping', type: 'debit', category: 'Shopping', amount: -150.00 },
  { id: 8, date: '2023-09-08', description: 'Freelance Payment', type: 'credit', category: 'Income', amount: 500.00 },
  { id: 9, date: '2023-09-07', description: 'Phone Bill', type: 'debit', category: 'Utilities', amount: -60.00 },
  { id: 10, date: '2023-09-06', description: 'Gym Membership', type: 'debit', category: 'Health', amount: -50.00 },
  // Add more mock transactions to show variety in the charts
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filters, setFilters] = useState({ dateRange: null, type: '', category: '', search: '' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Apply filters to transactions
    // This is where you'd typically make an API call with the new filters
    // For now, we'll just filter the mock data
    const filtered = mockTransactions.filter(transaction => {
      if (filters.dateRange && (new Date(transaction.date) < filters.dateRange[0] || new Date(transaction.date) > filters.dateRange[1])) return false;
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.category && transaction.category !== filters.category) return false;
      if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
    setTransactions(filtered);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Container size="xl">
      <Title order={1} mb="xl">Transactions</Title>
      
      <Grid mb="md">
        <Grid.Col span={12}>
          <Card shadow="sm" p="lg">
            <Group position="apart" mb="md">
              <DatePickerInput
                type="range"
                placeholder="Pick date range"
                // value={filters.dateRange}
                value={0}
                onChange={(value) => handleFilterChange('dateRange', value)}
              />
              <Select
                placeholder="Transaction Type"
                data={[
                  { value: '', label: 'All' },
                  { value: 'debit', label: 'Debit' },
                  { value: 'credit', label: 'Credit' },
                ]}
                value={filters.type}
                onChange={(value) => handleFilterChange('type', value)}
              />
              <Select
                placeholder="Category"
                data={[
                  { value: '', label: 'All' },
                  { value: 'Groceries', label: 'Groceries' },
                  { value: 'Utilities', label: 'Utilities' },
                  { value: 'Income', label: 'Income' },
                  { value: 'Dining', label: 'Dining' },
                  { value: 'Transportation', label: 'Transportation' },
                  { value: 'Entertainment', label: 'Entertainment' },
                  { value: 'Shopping', label: 'Shopping' },
                  { value: 'Health', label: 'Health' },
                ]}
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
              />
              <TextInput
                placeholder="Search transactions"
                icon={<IconSearch size={14} />}
                value={filters.search}
                onChange={(event) => handleFilterChange('search', event.currentTarget.value)}
              />
              <Button leftIcon={<IconFilter size={14} />}>Apply Filters</Button>
            </Group>
            <TransactionTable 
              transactions={transactions} 
              onTransactionClick={handleTransactionClick}
            />
          </Card>
        </Grid.Col>
      </Grid>

      <SpendingChart transactions={transactions} />

      <Modal
        opened={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
        size="lg"
      >
        {selectedTransaction && <TransactionDetails transaction={selectedTransaction} />}
      </Modal>
    </Container>
  );
}