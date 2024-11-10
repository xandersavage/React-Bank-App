import React, { useState } from 'react';
import { Select, NumberInput, Textarea, Button, Stack, TextInput, Group, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend, IconUser, IconNotes, IconPlus } from '@tabler/icons-react';

export default function TransferForm({ accounts, beneficiaries, onSubmit, onAddBeneficiary }) {
  const [isNewRecipient, setIsNewRecipient] = useState(false);
  const [addAsBeneficiary, setAddAsBeneficiary] = useState(false);

  const form = useForm({
    initialValues: {
      fromAccount: '',
      toAccount: '',
      newRecipientName: '',
      newRecipientAccount: '',
      amount: '',
      note: '',
    },
    validate: {
      fromAccount: (value) => (value ? null : 'Please select an account'),
      toAccount: (value, values) => 
        (isNewRecipient ? null : (value ? null : 'Please select a recipient')),
      newRecipientName: (value, values) => 
        (isNewRecipient && !value ? 'Please enter recipient name' : null),
      newRecipientAccount: (value, values) => 
        (isNewRecipient && !value ? 'Please enter recipient account number' : null),
      amount: (value) => (value > 0 ? null : 'Amount must be greater than 0'),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const submitData = {
      ...values,
      isNewRecipient,
      addAsBeneficiary,
    };
    onSubmit(submitData);
    if (isNewRecipient && addAsBeneficiary) {
      onAddBeneficiary({
        name: values.newRecipientName,
        accountNumber: values.newRecipientAccount,
      });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <Select
          label="From Account"
          placeholder="Select account"
          data={accounts.map((acc) => ({ value: acc.id.toString(), label: `${acc.name} ($${acc.balance})` }))}
          {...form.getInputProps('fromAccount')}
          icon={<IconUser size={14} />}
        />
        {!isNewRecipient ? (
          <Select
            label="To Account"
            placeholder="Select recipient"
            data={[
              { value: 'own', label: 'Own Account' },
              { value: 'new', label: 'New Recipient' },
              ...beneficiaries.map((ben) => ({ value: ben.id.toString(), label: `${ben.name} (${ben.accountNumber})` })),
            ]}
            {...form.getInputProps('toAccount')}
            icon={<IconUser size={14} />}
            onChange={(value) => {
              form.setFieldValue('toAccount', value);
              setIsNewRecipient(value === 'new');
            }}
          />
        ) : (
          <>
            <TextInput
              label="Recipient Name"
              placeholder="Enter recipient name"
              {...form.getInputProps('newRecipientName')}
              icon={<IconUser size={14} />}
            />
            <TextInput
              label="Recipient Account Number"
              placeholder="Enter account number"
              {...form.getInputProps('newRecipientAccount')}
              icon={<IconUser size={14} />}
            />
            <Group position="apart">
              <Switch
                label="Add as beneficiary"
                checked={addAsBeneficiary}
                onChange={(event) => setAddAsBeneficiary(event.currentTarget.checked)}
              />
              <Button 
                variant="outline" 
                size="xs" 
                leftIcon={<IconPlus size={14} />}
                onClick={() => {
                  setIsNewRecipient(false);
                  form.setFieldValue('toAccount', '');
                }}
              >
                Select Existing
              </Button>
            </Group>
          </>
        )}
        <NumberInput
          label="Amount"
          placeholder="Enter amount"
          min={0}
          precision={2}
          {...form.getInputProps('amount')}
          icon="$"
        />
        <Textarea
          label="Note (Optional)"
          placeholder="Add a note"
          {...form.getInputProps('note')}
          icon={<IconNotes size={14} />}
        />
        <Button type="submit" leftIcon={<IconSend size={14} />}>
          Transfer Funds
        </Button>
      </Stack>
    </form>
  );
}